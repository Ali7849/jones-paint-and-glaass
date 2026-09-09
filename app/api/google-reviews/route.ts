import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const { searchParams } = new URL(req.url);

  // Per-location Place ID if given, otherwise the site-wide default
  const placeId = searchParams.get("placeId") || process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.error("Google reviews: missing credentials", {
      hasApiKey: !!apiKey,
      hasPlaceId: !!placeId,
    });
    return NextResponse.json(
      { error: "Missing Google credentials" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
        },
        // Places API is billed per call — cache for an hour
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Google Places API error:",
        response.status,
        data?.error?.message ?? data
      );
      return NextResponse.json(
        { error: "Google API Error", status: response.status },
        { status: response.status }
      );
    }

    // The business listing — NOT the reviewer's personal profile
    const googleMapsUri = data.googleMapsUri || "";

    const reviews =
      data.reviews?.map((review: any) => ({
        id: review.name,
        quote: review.originalText?.text || review.text?.text || "",
        name: review.authorAttribution?.displayName || "Google User",
        rating: review.rating || 0,
        relativeTime: review.relativePublishTimeDescription || "",
        link: googleMapsUri,
      })) || [];

    return NextResponse.json({
      businessName: data.displayName?.text || "",
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      googleMapsUri,
      reviews,
    });
  } catch (error) {
    console.error("Google reviews server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}