import { Suspense } from "react";
import SearchUserClient from "./SearchUserClient";

export default function UserSearchPage() {
  return (
    <Suspense>
      <SearchUserClient />
    </Suspense>
  );
}
