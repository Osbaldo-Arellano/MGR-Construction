import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Browse our portfolio of work.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Project Gallery",
    description: "Browse our portfolio of work.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
