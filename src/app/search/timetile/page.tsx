import { Suspense } from "react";
import SearchTimeTileClient from "./SearchTimeTileClient";

export default function TimeTileSearchPage() {
  return (
    <Suspense>
      <SearchTimeTileClient />
    </Suspense>
  );
}
