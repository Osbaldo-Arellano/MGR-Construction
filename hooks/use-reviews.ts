"use client";

import { useEffect, useState } from "react";
import { supabase, type BrandReviewRow } from "@/lib/supabase";

export function useReviews() {
  const [reviews, setReviews] = useState<BrandReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = process.env.NEXT_PUBLIC_BRAND_USER_ID;
    if (!userId) {
      setLoading(false);
      return;
    }

    supabase
      .from("brand_reviews")
      .select("*")
      .eq("user_id", userId)
      .order("sort_order")
      .returns<BrandReviewRow[]>()
      .then(({ data }) => {
        if (data) setReviews(data);
        setLoading(false);
      });
  }, []);

  return { reviews, loading };
}
