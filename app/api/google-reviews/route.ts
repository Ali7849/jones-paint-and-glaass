import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  console.log("API KEY EXISTS:", !!apiKey);
  console.log("PLACE ID:", placeId);

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        error: "Missing Google credentials",
        hasApiKey: !!apiKey,
        placeId: placeId || null,
      },
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
      }
    );

    const data = await response.json();

    console.log("GOOGLE STATUS:", response.status);
    console.log("GOOGLE RESPONSE:", data);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Google API Error",
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    // ✅ Extract googleMapsUri once
    const googleMapsUri = data.googleMapsUri || "";

    const reviews =
      data.reviews?.map((review: any) => ({
        id: review.name,
        quote: review.originalText?.text || review.text?.text || "",
        name: review.authorAttribution?.displayName || "Google User",
        rating: review.rating || 0,
        relativeTime: review.relativePublishTimeDescription || "",
        link: review.authorAttribution?.uri || googleMapsUri, // ✅ reviewer profile or business maps page
      })) || [];

    return NextResponse.json({
      businessName: data.displayName?.text || "",
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      googleMapsUri,
      reviews,
    });
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: "Server error",
        details: String(error),
      },
      { status: 500 }
    );
  }
}