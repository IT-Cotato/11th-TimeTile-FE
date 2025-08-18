"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

export function HeaderWrapper() {
  const pathname = usePathname();
  const hideHeader = ["/login", "/register"].includes(pathname);
  return hideHeader ? null : <Header />;
}
