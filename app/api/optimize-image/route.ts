import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");
    const width = searchParams.get("w")
      ? parseInt(searchParams.get("w")!)
      : undefined;
    const height = searchParams.get("h")
      ? parseInt(searchParams.get("h")!)
      : undefined;
    const quality = searchParams.get("q")
      ? parseInt(searchParams.get("q")!)
      : 80;
    const format =
      (searchParams.get("f") as "webp" | "avif" | "jpeg" | "png") || "webp";
    const fit =
      (searchParams.get("fit") as
        | "cover"
        | "contain"
        | "fill"
        | "inside"
        | "outside") || "cover";

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    // Fetch the image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 404 }
      );
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Optimize the image
    let pipeline = sharp(imageBuffer);

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, { fit });
    }

    // Convert to specified format with quality
    let optimizedBuffer: Buffer;
    switch (format) {
      case "webp":
        optimizedBuffer = await pipeline.webp({ quality }).toBuffer();
        break;
      case "avif":
        optimizedBuffer = await pipeline.avif({ quality }).toBuffer();
        break;
      case "jpeg":
        optimizedBuffer = await pipeline.jpeg({ quality }).toBuffer();
        break;
      case "png":
        optimizedBuffer = await pipeline.png({ quality }).toBuffer();
        break;
      default:
        optimizedBuffer = await pipeline.webp({ quality }).toBuffer();
    }

    // Set appropriate headers
    const headers = new Headers();
    headers.set("Content-Type", `image/${format}`);
    headers.set("Cache-Control", "public, max-age=31536000, immutable"); // 1 year cache
    headers.set("Access-Control-Allow-Origin", "*");

    return new NextResponse(optimizedBuffer as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Image optimization error:", error);
    return NextResponse.json(
      { error: "Image optimization failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const width = formData.get("w")
      ? parseInt(formData.get("w") as string)
      : undefined;
    const height = formData.get("h")
      ? parseInt(formData.get("h") as string)
      : undefined;
    const quality = formData.get("q")
      ? parseInt(formData.get("q") as string)
      : 80;
    const format =
      (formData.get("f") as "webp" | "avif" | "jpeg" | "png") || "webp";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await file.arrayBuffer());

    // Optimize the image
    let pipeline = sharp(imageBuffer);

    if (width || height) {
      pipeline = pipeline.resize(width, height, { fit: "cover" });
    }

    let optimizedBuffer: Buffer;
    switch (format) {
      case "webp":
        optimizedBuffer = await pipeline.webp({ quality }).toBuffer();
        break;
      case "avif":
        optimizedBuffer = await pipeline.avif({ quality }).toBuffer();
        break;
      case "jpeg":
        optimizedBuffer = await pipeline.jpeg({ quality }).toBuffer();
        break;
      case "png":
        optimizedBuffer = await pipeline.png({ quality }).toBuffer();
        break;
      default:
        optimizedBuffer = await pipeline.webp({ quality }).toBuffer();
    }

    const headers = new Headers();
    headers.set("Content-Type", `image/${format}`);

    return new NextResponse(optimizedBuffer as any, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Image optimization error:", error);
    return NextResponse.json(
      { error: "Image optimization failed" },
      { status: 500 }
    );
  }
}
