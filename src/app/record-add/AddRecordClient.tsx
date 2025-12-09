"use client";

import { useSearchParams } from "next/navigation";
import IndividualRecordPage from "./IndividualRecordPage";

export default function AddRecordClient() {
  const params = useSearchParams();
  const groupId = params.get("groupId");

  return <IndividualRecordPage groupId={groupId} />;
}
