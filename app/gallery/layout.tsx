import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Browse MGR Construction LLC's portfolio of siding, roofing, painting, windows, and doors projects across Oregon.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Project Gallery | MGR Construction LLC",
    description: "Browse siding, roofing, painting, windows, and doors projects by MGR Construction LLC — serving Oregon and 120+ miles beyond.",
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
