import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-10 items-center justify-center rounded-l-md border-r border-[var(--cardborder)] bg-slate-800/20 p-2">
        <CiSearch className="text-[var(--secondarytext)]" />
      </div>
      <input
        className="h-10 w-52 rounded-r-lg bg-slate-800/20 pl-2 text-xs text-[var(--secondarytext)] outline-none"
        placeholder="Search your favorite coin"
      />
    </div>
  );
}

export default Search;
