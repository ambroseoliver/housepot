"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, BedDouble, MapPin, RefreshCw } from "lucide-react";
import { fetchListings, type Listing } from "@/lib/listings";

type ListingGridProps = {
  location?: string;
  type?: string;
  maxPrice?: string;
  limit?: number;
};

function matchesType(listing: Listing, type: string) {
  if (!type) return true;
  if (type === "bedsitter" || type === "studio") {
    return `${listing.title} ${listing.propertyType}`.toLowerCase().includes(type);
  }
  const bedrooms = Number(type.match(/\d+/)?.[0]);
  return Number.isFinite(bedrooms) && listing.bedrooms !== null
    ? (type === "3-bedroom"
        ? listing.bedrooms >= bedrooms
        : listing.bedrooms === bedrooms)
    : `${listing.title} ${listing.propertyType}`.toLowerCase().includes(type);
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e4e9e4] bg-white shadow-[0_8px_28px_rgba(27,45,33,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(27,45,33,0.12)] dark:border-[#2b3a30] dark:bg-[#18231c]">
      <div className="relative aspect-[1.4] overflow-hidden bg-[#e8eee8] dark:bg-[#253329]">
        {listing.image ? (
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#dce8dd] to-[#f2f4ee] text-[#78927e] dark:from-[#26382b] dark:to-[#1d2b21]">
            <span className="text-sm font-medium">Photo coming soon</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#285c45] shadow-sm dark:bg-[#18231c]/95 dark:text-[#b6d8bd]">
          For rent
        </span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-[#202a24] dark:text-white">
            {listing.title}
          </h3>
          <span className="shrink-0 rounded-lg bg-[#f1f5f0] px-2.5 py-1.5 text-sm font-bold text-[#285c45] dark:bg-[#26382b] dark:text-[#b6d8bd]">
            {listing.price}
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-[#66736b] dark:text-[#aab5ad]">
          <MapPin size={15} aria-hidden="true" />
          {listing.location}
        </p>
        {listing.bedrooms !== null && (
          <div className="mt-4 flex items-center gap-2 border-t border-[#e4e9e4] pt-3 text-sm text-[#66736b] dark:border-[#2b3a30] dark:text-[#aab5ad]">
            <BedDouble size={16} aria-hidden="true" />
            {listing.bedrooms} {listing.bedrooms === 1 ? "bedroom" : "bedrooms"}
            {listing.bathrooms !== null && (
              <span className="ml-2">
                · {listing.bathrooms}{" "}
                {listing.bathrooms === 1 ? "bathroom" : "bathrooms"}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function ListingGrid({
  location = "",
  type = "",
  maxPrice = "",
  limit,
}: ListingGridProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadListings = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setListings(await fetchListings());
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "We couldn’t load homes right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadListings();
  }, [loadListings]);

  const filteredListings = useMemo(() => {
    const query = location.trim().toLocaleLowerCase();
    const parsedBudget = Number(maxPrice);
    const budget =
      maxPrice && Number.isFinite(parsedBudget) && parsedBudget > 0
        ? parsedBudget
        : null;
    return listings.filter((listing) => {
      const locationMatches =
        !query || `${listing.location} ${listing.title}`.toLocaleLowerCase().includes(query);
      const priceMatches =
        budget === null ||
        listing.numericPrice === null ||
        listing.numericPrice <= budget;
      return locationMatches && priceMatches && matchesType(listing, type);
    });
  }, [listings, location, maxPrice, type]);

  const visibleListings = limit
    ? filteredListings.slice(0, limit)
    : filteredListings;

  if (loading) {
    return (
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Loading homes"
        aria-busy="true"
      >
        {[1, 2, 3].slice(0, limit ?? 3).map((item) => (
          <div
            key={item}
            className="aspect-[1.35] animate-pulse rounded-2xl bg-[#e8eee8] dark:bg-[#253329]"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#e4e9e4] bg-white px-6 py-10 text-center dark:border-[#2b3a30] dark:bg-[#18231c]">
        <p className="font-semibold text-[#202a24] dark:text-white">
          Homes aren’t available right now
        </p>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#66736b] dark:text-[#aab5ad]">
          {error} Set{" "}
          <code className="rounded bg-[#f1f5f0] px-1.5 py-0.5 dark:bg-[#26382b]">
            NEXT_PUBLIC_BACKEND_URL
          </code>{" "}
          to your Django server URL, and allow this frontend&apos;s origin in
          Django&apos;s CORS settings.
        </p>
        <button
          type="button"
          onClick={() => void loadListings()}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#285c45] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1d4635] dark:bg-[#9ac5a5] dark:text-[#17231b]"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </div>
    );
  }

  if (visibleListings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#cbd6cc] px-6 py-12 text-center dark:border-[#3a4b3e]">
        <p className="font-semibold text-[#202a24] dark:text-white">
          {listings.length === 0 ? "No homes have been listed yet" : "No homes match your search"}
        </p>
        <p className="mt-2 text-sm text-[#66736b] dark:text-[#aab5ad]">
          {listings.length === 0
            ? "Check back soon for new places to call home."
            : "Try a different neighbourhood or adjust your filters."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
      {limit && filteredListings.length > limit && (
        <div className="mt-10 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full border border-[#cbd6cc] px-6 py-3 text-sm font-semibold text-[#285c45] transition hover:border-[#285c45] hover:bg-[#f1f5f0] dark:border-[#3a4b3e] dark:text-[#b6d8bd] dark:hover:bg-[#18231c]"
          >
            View all homes <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </>
  );
}
