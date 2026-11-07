# Housepot frontend

The Housepot website is built with Next.js App Router, TypeScript, Tailwind
CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

By default, the frontend requests rental homes from
`http://127.0.0.1:8000/api/listings/`. Set `NEXT_PUBLIC_API_URL` to the Django
server origin when it runs elsewhere:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

The listings endpoint should return a JSON array or a paginated object with a
`results`, `data`, or `listings` array. Each listing should expose a title or
name, a location, and a monthly rent or price. Optional fields include an id,
property type, bedrooms, bathrooms, and an image URL/path. The frontend accepts
common aliases such as `monthly_rent`, `rent`, `price`, `cover_image`, and
`main_image`.

Search filters are applied to the listings returned by the endpoint. The
backend must allow browser requests from the frontend origin through CORS.
