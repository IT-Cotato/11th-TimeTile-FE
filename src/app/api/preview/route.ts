import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

/**
 * OpenGraph + 일반 이미지 추출
 * 유튜브, 인스타그램, 블로그 등 대부분의 사이트 대응
 */
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
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch URL: ${targetUrl}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // 메타 태그에서 정보 추출
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

    if (fixedImage && fixedImage.startsWith("/")) {
      const base = new URL(targetUrl).origin;
      fixedImage = `${base}${fixedImage}`;
    }

    // 유튜브 링크일 경우 썸네일
    if (!fixedImage && targetUrl.includes("youtube.com/watch?v=")) {
      const videoId = targetUrl.split("v=")[1].split("&")[0];
      fixedImage = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    // 인스타그램 fallback
    if (!fixedImage && targetUrl.includes("instagram.com")) {
      fixedImage =
        "https://static.cdninstagram.com/rsrc.php/v3/yE/r/OG4v6s2sW3C.png";
    }

    // favicon fallback
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

    if (!fixedImage) {
      fixedImage = "/Symbol-Logo.png";
    }

    // 응답 반환
    return NextResponse.json({
      title: title.trim(),
      image: fixedImage.trim(),
      description: description.trim(),
    });
  } catch (err) {
    console.error("🧨 preview error:", err);
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
