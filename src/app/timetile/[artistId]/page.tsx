import { Suspense } from "react";
import ArtistPage from "./timetileClientPage";

export default function TimeTilePage() {
  return (
    <Suspense>
      <ArtistPage />
    </Suspense>
  );
}
