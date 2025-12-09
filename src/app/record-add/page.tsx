import { Suspense } from "react";
import AddRecordClient from "./AddRecordClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddRecordClient />
    </Suspense>
  );
}
