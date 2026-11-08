# Housepot backend

Django REST API for Housepot accounts, rental listings, saved properties, inquiries, reviews, moderation, and notifications.

## Requirements

- Python 3.12 or later
- PostgreSQL 15 or later for production (SQLite is used for local development by default)
- Docker Compose is optional for running a local PostgreSQL instance

## Local setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

By default, the development settings use SQLite and print mail to the terminal. The API is available at `http://127.0.0.1:8000`; the admin is at `/admin/`, health checks at `/health/`, and interactive API docs at `/api/docs/`.

To use PostgreSQL locally, start the included service with `docker compose up -d db`, then set `DATABASE_URL` in `.env`, for example:

```env
DATABASE_URL=postgres://housepot:local-development-only@127.0.0.1:5432/housepot
```

## Configuration

Copy `.env.example` to `.env`. Never commit `.env` or production credentials.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DJANGO_SETTINGS_MODULE` | No | `config.settings.dev` locally; use `config.settings.prod` in production |
| `DJANGO_SECRET_KEY` | Production | Secret key generated specifically for the deployment |
| `DJANGO_ALLOWED_HOSTS` | Production | Comma-separated hostnames served by Django |
| `DATABASE_URL` | Production | PostgreSQL URL; SSL is required by default |
| `CORS_ALLOWED_ORIGINS` | Production | Exact frontend origins; do not use wildcards |
| `CSRF_TRUSTED_ORIGINS` | If needed | Exact HTTPS origins for Django admin/session CSRF |
| `FRONTEND_URL` | No | Public frontend origin used in email links |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` | Production | SMTP transport credentials |
| `EMAIL_OUTBOX_ENABLED` | Production | Queue non-sensitive notification email for the background outbox worker; defaults to `true` in production |
| `DEFAULT_FROM_EMAIL` | No | Sender displayed in account emails |
| `JWT_ACCESS_MINUTES` | No | Access-token lifetime; defaults to 10 minutes |
| `JWT_REFRESH_DAYS` | No | Rotating refresh-token lifetime; defaults to 7 days |
| `USE_S3_STORAGE` | No | Use S3-compatible object storage when set to `true` |
| `AWS_STORAGE_BUCKET_NAME`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | If S3 enabled | Object-storage credentials |
| `AWS_S3_REGION_NAME`, `AWS_S3_ENDPOINT_URL`, `AWS_S3_CUSTOM_DOMAIN` | No | S3 region and compatible endpoint/CDN |

Production settings fail startup when the secret key, hosts, or PostgreSQL URL are missing. They enable HTTPS redirect, secure cookies, HSTS, and strict content/referrer headers. Terminate TLS at the hosting platform or reverse proxy and set `SECURE_SSL_REDIRECT=false` only when HTTPS is enforced upstream and forwarding headers are configured correctly.

## Database and migrations

The custom email-based user model must be present in the first migration; do not replace it after deploying without a planned data migration. Create and apply schema changes with:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py makemigrations --check --dry-run
```

Database constraints protect positive prices, valid ratings, unique favorites/reviews, unique image positions, one primary image per listing, and reports with exactly one target. Listing, role, location, and notification indexes cover the main discovery and moderation queries.

Back up PostgreSQL before migrations and on a scheduled basis:

```bash
pg_dump --format=custom --no-owner "$DATABASE_URL" > "housepot-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_restore --clean --if-exists --no-owner --dbname="$DATABASE_URL" housepot-backup.dump
```

Store encrypted backups outside the application host and test restores regularly. The development SQLite database is local state and is not a production backup strategy.

## API

All new endpoints are versioned under `/api/v1/`. The frontend-compatible unversioned paths (such as `/api/users/register/` and `/api/listings/`) remain available. OpenAPI is available at `/api/schema/`; Swagger UI is at `/api/docs/`.

| Method and path | Access | Purpose |
| --- | --- | --- |
| `POST /api/v1/users/register/` | Public, throttled | Register a tenant or landlord; returns access/refresh JWTs |
| `POST /api/v1/users/login/` | Public, throttled | Sign in with email and password |
| `POST /api/v1/users/token/refresh/` | Public, throttled | Rotate a refresh token |
| `POST /api/v1/users/logout/` | Authenticated | Blacklist refresh token and revoke all sessions for the account |
| `POST /api/v1/users/verify-email/` | Public, throttled | Verify an email using its signed, expiring token |
| `POST /api/v1/users/password-reset/` | Public, throttled | Request password-reset instructions (response does not disclose account existence) |
| `POST /api/v1/users/password-reset/confirm/` | Public, throttled | Confirm a reset with `uid`, `token`, and `new_password` |
| `GET/PATCH /api/v1/users/profile/` | Authenticated | Read or update the current profile |
| `POST /api/v1/users/password/change/` | Authenticated | Change password; revoke existing sessions |
| `DELETE /api/v1/users/account/` | Authenticated | Deactivate and anonymize the account |
| `GET/POST /api/v1/listings/` | Public read; owner/agent write | Search listings or submit for review |
| `GET/PATCH/DELETE /api/v1/listings/{id}/` | Public read; owner/staff write | Retrieve or manage a listing |
| `GET /api/v1/listings/mine/` | Authenticated | List the caller's listings, including drafts/review status |
| `POST /api/v1/listings/{id}/approve/` | Staff | Approve and publish a listing |
| `POST /api/v1/listings/{id}/reject/` | Staff | Reject a listing with a reason |
| `/api/v1/favorites/` | Authenticated | Add, remove, and list the caller's favorites |
| `/api/v1/inquiries/` | Authenticated | Create inquiries; listing owners manage and respond |
| `/api/v1/reviews/` | Public read; authenticated write | Submit and moderate property reviews |
| `/api/v1/reports/` | Authenticated | Report one listing or review; staff manage resolution |
| `/api/v1/notifications/` | Authenticated | Read notifications and mark them read |

Validation errors use `{"status": 400, "errors": {...}}`. List endpoints use page-number pagination (`page`, `page_size`, capped at 100). Listing query parameters include `location`, `city`, `min_price`, `max_price`, `property_type`, `listing_type`, `bedrooms` (minimum), `bathrooms` (minimum), `amenity`, `search`, and `ordering` (`created_at`, `price`, `bedrooms`, `bathrooms`; prefix with `-` for descending).

Use the JWT `Authorization: Bearer <access>` header. Access tokens last 10 minutes; refresh tokens rotate and are blacklisted after rotation. Logout increments the account token version, invalidating outstanding access and refresh tokens. Password changes also revoke previous sessions.

### Roles and review flow

- Anonymous visitors can browse published listings and public reviews.
- Tenants can favorite properties, submit inquiries/reviews, and report content.
- Landlords and agents can create and manage only their own listings.
- New and edited listings return to `pending_review`; only staff can approve or reject them. Unpublished listings are never exposed to other users.
- Staff accounts are created by trusted administrators with `createsuperuser` or the Django admin. Public registration cannot self-assign the agent/admin roles.
- Suspended or inactive accounts cannot authenticate. Django staff status controls moderation and administrator endpoints.

Property creation accepts multipart form data. The existing frontend sends `title`, `location`, `property_type`, `monthly_rent`, `bedrooms`, `bathrooms`, `description`, and `image`; `image_files` supports up to 10 files. JPEG, PNG, and WebP files must be valid images and at most 8 MB each. Listings return a `cover_image` URL and ordered `images`.

## Email and background work

Account verification and password-reset mail use Django's configured email backend synchronously because those messages contain short-lived credentials. Development prints mail to the console; production uses SMTP. Non-sensitive inquiry and listing notifications can use the database-backed email outbox (enabled by default in production). Run `python manage.py process_email_outbox` from a worker or schedule it each minute; delivery is locked transactionally, retries transient failures with backoff, and marks messages failed after five attempts. No Redis or external queue is required.

Listings are given a 90-day publication period when approved. Expired listings are archived and expired featured placements are cleared by the idempotent management command:

```bash
python manage.py expire_listings
```

Schedule it daily with the deployment platform's scheduler. It can safely be run more than once.

## Deployment

The included Dockerfile runs Gunicorn as a non-root user. Provide production environment variables through the hosting platform, then deploy using a release step such as:

```bash
python manage.py check --deploy
python manage.py migrate --noinput
python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3 --timeout 60
```

Set `DJANGO_SETTINGS_MODULE=config.settings.prod`, configure PostgreSQL and SMTP, exact frontend CORS/CSRF origins, and a persistent or S3-compatible media store. The `/health/` endpoint verifies database connectivity. Configure platform logs/alerts and encrypted database/media backups; test rollback and restore procedures before production use.

## Tests and maintenance

```bash
python manage.py test
python manage.py check
python manage.py makemigrations --check --dry-run
```

Tests cover registration and verification, email/password authentication, token revocation, listing ownership and moderation, image validation, filters, favorites, inquiries, reviews, reports, and outbox delivery. GitHub Actions runs system checks, migration checks, and the test suite. Dependabot checks the backend, frontend, and workflow dependencies weekly; enable repository security alerts and review updates before release.
