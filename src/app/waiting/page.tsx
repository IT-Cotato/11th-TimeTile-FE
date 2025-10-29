import { Suspense } from "react";
import WaitingClientPage from "./waitingClientPage";

export default function WaitingPage() {
  return (
    <Suspense>
      <WaitingClientPage />
    </Suspense>
  );
}
