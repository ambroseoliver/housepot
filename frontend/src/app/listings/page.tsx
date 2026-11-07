import type { Metadata } from "next";
import ListingGrid from "../components/ListingGrid";
import SearchBar from "../components/SearchBar";

type ListingsPageProps = {
  searchParams: Promise<{
    location?: string;
    type?: string;
    max_price?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Rental homes",
  description: "Search rental homes across Kenya by neighbourhood, home type, and budget.",
};

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const filters = await searchParams;
  const location = filters.location?.trim() ?? "";

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-5 pb-20 pt-32 dark:bg-[#111a15] sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
            Homes for rent
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-5xl">
            {location ? `Homes in ${location}` : "Find your next home"}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-[#66736b] dark:text-[#aab5ad]">
            Explore available rentals across Kenya. Narrow your options by
            neighbourhood, home type, and monthly budget.
          </p>
        </div>
        <div className="mb-10 max-w-5xl">
          <SearchBar
            initialLocation={location}
            initialType={filters.type}
            initialMaxPrice={filters.max_price}
          />
        </div>
        <ListingGrid
          location={location}
          type={filters.type}
          maxPrice={filters.max_price}
        />
      </div>
    </section>
  );
}
