import ListingGrid from "./ListingGrid";

export default function FeaturedListings() {
  return (
    <section
      id="available-homes"
      className="bg-[#f8f8f5] px-5 py-20 dark:bg-[#111a15] sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#52765b] dark:text-[#b6d8bd]">
              Find your fit
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#202a24] dark:text-white sm:text-4xl">
              Places worth coming home to
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-[#66736b] dark:text-[#aab5ad]">
              Browse available rentals and discover a space that feels right
              for you.
            </p>
          </div>
        </div>
        <ListingGrid limit={3} />
      </div>
    </section>
  );
}
