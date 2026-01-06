import { IconMic, IconSearch } from "./Icons";

export function SearchBar() {
  return (
    <div className="searchbar" role="search">
      <IconSearch className="icon muted" />
      <input
        aria-label="Search"
        placeholder="Describe your issue or service…"
        defaultValue=""
      />
      <IconMic className="icon muted" />
    </div>
  );
}

