// app/api/reviews/route.ts
import { REVIEWS_API_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

/** --- Type Definitions --- */
export interface GoogleReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number; // Unix timestamp
  relative_time_description?: string;
  author_url?: string;
}

export interface GooglePlaceDetails {
  name: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
}

export interface ReviewsApiResponse {
  placeName?: string;
  rating?: number;
  total?: number;
  reviews: {
    authorName: string;
    profilePhotoUrl?: string;
    rating: number;
    text: string;
    time: number;
    relativeTime?: string;
    authorUrl?: string;
  }[];
  error?: string;
}

export const revalidate = 3600; // 1 saat cache

export async function GET(): Promise<NextResponse<ReviewsApiResponse>> {
  try {
    const placeId = process.env.GMB_PLACE_ID;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!placeId || !apiKey) {
      return NextResponse.json(
        { reviews: [], error: "MISSING_CONFIG" },
        { status: 200 }
      );
    }

    const params = new URLSearchParams({
      place_id: placeId,
      fields: "name,rating,user_ratings_total,reviews",
      language: "tr",
      key: apiKey,
    });

    const url = `${REVIEWS_API_URL}${params.toString()}`;
    const res = await fetch(url, { next: { revalidate } });
    const data = (await res.json()) as {
      status: string;
      result?: GooglePlaceDetails;
    };

    if (data.status !== "OK" || !data.result) {
      return NextResponse.json(
        { reviews: [], error: data.status || "NO_RESULT" },
        { status: 200 }
      );
    }

    const { name, rating, user_ratings_total, reviews = [] } = data.result;

    const mappedReviews: ReviewsApiResponse["reviews"] = reviews.map((r) => ({
      authorName: r.author_name,
      profilePhotoUrl: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      time: r.time,
      relativeTime: r.relative_time_description,
      authorUrl: r.author_url,
    }));

    return NextResponse.json({
      placeName: name,
      rating,
      total: user_ratings_total,
      reviews: mappedReviews,
    });
  } catch (error) {
    console.error("❌ Google Reviews API Error:", error);
    return NextResponse.json(
      { reviews: [], error: "FETCH_ERROR" },
      { status: 500 }
    );
  }
}
