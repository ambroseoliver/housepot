# Housepot

Housepot is a rental-home discovery platform focused on renters and property owners in Kenya. The repository contains a responsive Next.js frontend and a Django backend scaffold.

> **Project status:** The frontend experience is implemented, but the backend in this repository is currently a Django admin scaffold. Rental listings, authentication, and property-submission API endpoints are not implemented yet, so API-dependent features require a compatible backend to work end to end.

## Screenshots

| Home | Discover |
| --- | --- |
| ![Housepot home page](docs/screenshots/homepage.png) | ![Housepot discover page](docs/screenshots/discover.png) |

## Features

- Browse and search rental homes by neighbourhood, property type, and monthly budget.
- Discover common home types, including bedsitters, studios, and one- and two-bedroom homes.
- Responsive layouts, light and dark themes, and animated interface elements.
- Tenant sign-in and registration flows, plus a landlord property-listing flow (requires the API described below).
- Supporting pages for About, FAQs, and customer support.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| UI | Framer Motion, Lucide React, next-themes |
| Backend scaffold | Django 5.2, Django REST Framework, Simple JWT |
| Default database | SQLite |

## Repository layout

```text
.
├── backend/
│   ├── config/                 # Django settings and URL configuration
│   ├── manage.py
│   └── requirements.txt
├── docs/
│   └── screenshots/            # README screenshots
└── frontend/
    ├── public/                 # Property, partner, and brand assets
    └── src/
        ├── app/                # Routes and shared UI components
        └── lib/                # API and listing helpers
```

## Run locally

You will need Node.js 20 or later and Python 3.10 or later. Run the backend and frontend in separate terminals.

### 1. Start the Django backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

On Windows, activate the virtual environment with `.venv\Scripts\activate`.

The Django server runs at `http://127.0.0.1:8000`. At present, it only exposes Django's admin route at `/admin/`; the rental API endpoints are not included.

### 2. Start the Next.js frontend

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:3000`.

The frontend uses `http://127.0.0.1:8000` as its default API origin. To point it at another compatible backend, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Restart the frontend after changing environment variables.

## Application routes

| Route | Description |
| --- | --- |
| `/` | Landing page, home search, featured rentals, and location discovery |
| `/discover` | Browse by home type |
| `/listings` | Rental search and filters |
| `/about` | About Housepot |
| `/support` | Support and common questions |
| `/account` | Tenant and landlord account flows |
| `/list-property` | Landlord property submission |

## Backend integration

The frontend expects a Django API with these endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/listings/` | Return listings as an array or an object containing a `results`, `data`, or `listings` array |
| `POST` | `/api/users/register/` | Register an account; landlord registration sends `role: "landlord"` |
| `POST` | `/api/users/login/` | Authenticate and return an access JWT |
| `POST` | `/api/listings/` | Submit a property as multipart form data, authenticated with a JWT |

Listings should include a title or name, location, and monthly rent or price. Property submissions include a title, location, property type, monthly rent, bedroom and bathroom counts, description, and image. The backend should enforce landlord permissions, configure CORS for the frontend origin, and validate all submitted data.

These are frontend integration expectations, not implemented API endpoints in this repository. See the [frontend README](frontend/README.md) for additional payload and response details.

## Development

From `frontend/`:

```bash
npm run lint
npm run build
```

The backend's development settings are not production-ready. Before deployment, configure secrets and hosts securely, disable debug mode, and implement and test the required API endpoints.

## Maintainer

[Oliver Ambrose](https://github.com/ambroseoliver)
