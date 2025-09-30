import { Suspense } from "react";
import SearchMyTileClient from "./SearchMyTileClient";

export default function MyTileSearchPage() {
  return (
    <Suspense>
      <SearchMyTileClient />
    </Suspense>
  );
}
