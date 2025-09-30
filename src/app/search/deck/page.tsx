import { Suspense } from "react";
import SearchDeckClient from "./SearchDeckClient";

export default function DeckSearchPage() {
  return (
    <Suspense>
      <SearchDeckClient />
    </Suspense>
  );
}
