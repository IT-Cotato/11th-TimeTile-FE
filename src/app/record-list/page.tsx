import { Suspense } from "react";
import RecordListClient from "./RecordListClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecordListClient />
    </Suspense>
  );
}
