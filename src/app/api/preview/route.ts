export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 }
    );
  }

  try {
    if (targetUrl.includes("youtube.com") || targetUrl.includes("youtu.be")) {
      let videoId = "";

      try {
        const urlObj = new URL(targetUrl);
        const paramV = urlObj.searchParams.get("v");
        if (paramV) videoId = paramV;

        if (!videoId && targetUrl.includes("youtu.be/")) {
          videoId = targetUrl.split("youtu.be/")[1].split(/[?&]/)[0];
        }

        if (!videoId && targetUrl.includes("shorts/")) {
          videoId = targetUrl.split("shorts/")[1].split(/[?&]/)[0];
        }

        videoId = videoId.replace(/[\s&?=].*$/, "").trim();
      } catch (e) {
        console.error("YouTube ID parse error:", e);
      }

      if (videoId) {
        try {
          const oembedRes = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
          );

          if (oembedRes.ok) {
            const data = await oembedRes.json();
            return NextResponse.json({
              title: data.title || "YouTube Video",
              image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              description: data.author_name
                ? `by ${data.author_name} on YouTube`
                : "YouTube video",
            });
          }
        } catch {}

        return NextResponse.json({
          title: "YouTube Video",
          image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          description: "YouTube video preview",
        });
      }
    }

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ko,en;q=0.9",
      },
      redirect: "follow",
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${targetUrl}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const getMeta = (names: string[]): string | undefined => {
      for (const name of names) {
        const content =
          $(`meta[property="${name}"]`).attr("content") ||
          $(`meta[name="${name}"]`).attr("content");
        if (content) return content;
      }
      return undefined;
    };

    const title =
      getMeta(["og:title", "twitter:title"]) ||
      $("title").text() ||
      "제목 없음";

    const image =
      getMeta(["og:image", "twitter:image"]) ||
      $('meta[itemprop="image"]').attr("content") ||
      "";

    const description =
      getMeta(["og:description", "description", "twitter:description"]) || "";

    let fixedImage = image || $("img").first().attr("src") || "";

    if (fixedImage.startsWith("/")) {
      const base = new URL(targetUrl).origin;
      fixedImage = `${base}${fixedImage}`;
    }

    if (!fixedImage && targetUrl.includes("instagram.com")) {
      fixedImage =
        "https://static.cdninstagram.com/rsrc.php/v3/yE/r/OG4v6s2sW3C.png";
    }

    if (!fixedImage) {
      const favicon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href");
      if (favicon) {
        const base = new URL(targetUrl).origin;
        fixedImage = favicon.startsWith("http")
          ? favicon
          : `${base}${favicon.startsWith("/") ? "" : "/"}${favicon}`;
      }
    }

    if (!fixedImage) fixedImage = "/Symbol-Logo.png";

    return NextResponse.json({
      title: title.trim(),
      image: fixedImage.trim(),
      description: description.trim(),
    });
  } catch (err) {
    console.error("preview error:", err);
    return NextResponse.json(
      {
        title: "",
        image: "",
        description: "",
        error: "Failed to fetch preview metadata",
      },
      { status: 500 }
    );
  }
}
