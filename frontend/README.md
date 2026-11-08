# Housepot frontend

The Housepot website is built with Next.js App Router, TypeScript, Tailwind
CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

By default, the frontend requests rental homes from
`http://127.0.0.1:8000/api/listings/`. Set `NEXT_PUBLIC_BACKEND_URL` to the Django
server origin when it runs elsewhere:

```bash
# frontend/.env.local
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

`NEXT_PUBLIC_API_URL` is also supported as a fallback for existing deployments;
`NEXT_PUBLIC_BACKEND_URL` takes precedence. Restart the Next.js server after
changing either variable. In production, add the deployed frontend origin to
Django's `CORS_ALLOWED_ORIGINS`.

The listings endpoint should return a JSON array or a paginated object with a
`results`, `data`, or `listings` array. Each listing should expose a title or
name, a location, and a monthly rent or price. Optional fields include an id,
property type, bedrooms, bathrooms, and an image URL/path. The frontend accepts
common aliases such as `monthly_rent`, `rent`, `price`, `cover_image`, and
`main_image`.

Search filters are applied to the listings returned by the endpoint. The
backend must allow browser requests from the frontend origin through CORS.

## Landlord accounts and property submissions

The landlord journey uses these Django REST endpoints:

- `POST /api/users/register/` with JSON fields `full_name`, `email`,
  `phone_number`, `password`, and `role: "landlord"`.
- `POST /api/users/login/` with `email` and `password`, returning an `access`
  or `access_token` JWT (an optional refresh token is also accepted).
- `POST /api/listings/` with a Bearer access token and `multipart/form-data`
  fields `title`, `location`, `property_type`, `monthly_rent`, `bedrooms`,
  `bathrooms`, `description`, and `image`.

The frontend keeps JWTs in `sessionStorage` for the current browser tab. The
backend must enforce landlord permissions for listing creation and return
appropriate `401`/`403` responses. Property publishing, review, and storage
are backend responsibilities; the frontend only reports success after the
listing endpoint accepts the submission.
