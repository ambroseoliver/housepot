import { MapPin, Search } from "lucide-react";

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#e4e9e4] bg-white px-4 text-sm text-[#202a24] outline-none transition placeholder:text-[#89938c] focus:border-[#78a987] focus:ring-4 focus:ring-[#78a987]/15 dark:border-[#2b3a30] dark:bg-[#18231c] dark:text-white dark:placeholder:text-gray-400";

type SearchBarProps = {
  initialLocation?: string;
  initialType?: string;
  initialMaxPrice?: string;
};

export default function SearchBar({
  initialLocation = "",
  initialType = "",
  initialMaxPrice = "",
}: SearchBarProps) {
  return (
    <form
      action="/listings"
      method="get"
      role="search"
      className="grid gap-3 rounded-2xl border border-white/60 bg-white p-3 shadow-[0_24px_70px_rgba(15,35,22,0.2)] sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:rounded-[20px] sm:p-4"
    >
      <label className="relative block">
        <span className="sr-only">Neighbourhood or city</span>
        <MapPin
          aria-hidden="true"
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66736b]"
        />
        <input
          className={`${fieldClassName} pl-11`}
          type="search"
          name="location"
          placeholder="Where do you want to live?"
          autoComplete="address-level2"
          defaultValue={initialLocation}
        />
      </label>

      <label>
        <span className="sr-only">Home type</span>
        <select className={fieldClassName} name="type" defaultValue={initialType}>
          <option value="">Any home type</option>
          <option value="bedsitter">Bedsitter</option>
          <option value="studio">Studio</option>
          <option value="1-bedroom">1 bedroom</option>
          <option value="2-bedroom">2 bedrooms</option>
          <option value="3-bedroom">3+ bedrooms</option>
        </select>
      </label>

      <label>
        <span className="sr-only">Monthly budget</span>
        <select
          className={fieldClassName}
          name="max_price"
          defaultValue={initialMaxPrice}
        >
          <option value="">Any monthly budget</option>
          <option value="15000">Up to KSh 15,000</option>
          <option value="25000">Up to KSh 25,000</option>
          <option value="50000">Up to KSh 50,000</option>
          <option value="100000">Up to KSh 100,000</option>
        </select>
      </label>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#285c45] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1d4635] focus-visible:outline-white dark:bg-[#9ac5a5] dark:text-[#17231b] dark:hover:bg-[#b6d8bd]"
      >
        <Search size={17} />
        Search homes
      </button>
    </form>
  );
}
