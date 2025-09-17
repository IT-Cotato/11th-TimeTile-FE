import SearchClient from "./SearchClient";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return <SearchClient query={searchParams.query || ""} />;
}
