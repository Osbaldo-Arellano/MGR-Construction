import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch video walkthroughs of our work.",
  alternates: {
    canonical: "/gallery/video",
  },
  openGraph: {
    title: "Video Gallery",
    description: "Watch video walkthroughs of our work.",
    url: "/gallery/video",
    type: "website",
  },
};

export default function VideoGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
