import type { Metadata } from "next";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import { JotaiInitializer } from "@/components/layouts/JotaiInitializer";
import { HeaderWrapper } from "@/components/layouts/HeaderWrapper";

export const metadata: Metadata = {
  title: "TimeTile",
  description: "타임라인 기반 덕질 아카이빙 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <JotaiProvider>
          <JotaiInitializer />
          <HeaderWrapper />
          {children}
        </JotaiProvider>
        <div id="tooltip-portal"></div>
      </body>
    </html>
  );
}
