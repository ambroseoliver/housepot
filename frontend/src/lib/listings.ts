export type Listing = {
  id: string;
  title: string;
  location: string;
  price: string;
  numericPrice: number | null;
  image: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string;
};

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asText(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const numericText = value.replace(/[^\d.]/g, "");
  if (!numericText) return null;
  const parsed = Number(numericText);
  return Number.isFinite(parsed) ? parsed : null;
}

function readImage(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!isRecord(value)) return null;
  return asText(value.url) ?? asText(value.image) ?? asText(value.file);
}

function normalizeListing(value: unknown, index: number): Listing | null {
  if (!isRecord(value)) return null;

  const title =
    asText(value.title) ?? asText(value.name) ?? asText(value.property_name);
  if (!title) return null;

  const priceValue =
    value.monthly_rent ?? value.rent ?? value.price ?? value.monthly_price;
  const priceNumber = asNumber(priceValue);
  const priceText = asText(priceValue);
  const price = priceNumber !== null
    ? `KSh ${new Intl.NumberFormat("en-KE").format(priceNumber)} / month`
    : priceText ?? "Contact for price";

  const imageList = Array.isArray(value.images) ? value.images : [];
  const image =
    readImage(value.cover_image) ??
    readImage(value.main_image) ??
    readImage(value.image_url) ??
    readImage(value.image) ??
    readImage(value.photo) ??
    readImage(imageList[0]);
  const locationValue = value.location ?? value.neighbourhood ?? value.address;
  const location = isRecord(locationValue)
    ? asText(locationValue.name) ?? asText(locationValue.address) ?? "Kenya"
    : asText(locationValue) ?? asText(value.area) ?? "Kenya";
  const id =
    asText(value.id) ??
    asText(value.pk) ??
    `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`;

  return {
    id,
    title,
    location,
    price,
    numericPrice: priceNumber,
    image: image
      ? image.startsWith("http://") || image.startsWith("https://")
        ? image
        : `${apiBaseUrl}${image.startsWith("/") ? "" : "/"}${image}`
      : null,
    bedrooms: asNumber(value.bedrooms ?? value.beds),
    bathrooms: asNumber(value.bathrooms ?? value.baths),
    propertyType:
      asText(value.property_type) ?? asText(value.type) ?? asText(value.category) ?? "",
  };
}

export async function fetchListings(): Promise<Listing[]> {
  const response = await fetch(`${apiBaseUrl}/api/listings/`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Listings request failed with status ${response.status}.`);
  }

  const payload: unknown = await response.json();
  const collection = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.results)
      ? payload.results
      : isRecord(payload) && Array.isArray(payload.data)
        ? payload.data
        : isRecord(payload) && Array.isArray(payload.listings)
          ? payload.listings
          : null;

  if (!collection) {
    throw new Error("The listings endpoint returned an unexpected response.");
  }

  return collection
    .map(normalizeListing)
    .filter((listing): listing is Listing => listing !== null);
}
