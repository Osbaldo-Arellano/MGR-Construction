import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Gallery",
  description: "Watch MGR Construction LLC project walkthroughs — siding, roofing, painting, windows, and doors installations across Oregon.",
  alternates: {
    canonical: "/gallery/video",
  },
  openGraph: {
    title: "Video Gallery | MGR Construction LLC",
    description: "Watch siding, roofing, painting, windows, and doors project videos from MGR Construction LLC, serving Oregon and beyond.",
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
