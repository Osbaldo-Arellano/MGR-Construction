import { AnnouncementBarDefault } from "@/components/sections/announcement-bar/default";
import { NavbarDefault } from "@/components/sections/navbar/default";
import { FooterDefault } from "@/components/sections/footer/default";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBarDefault />
      <NavbarDefault />
      {children}
      <FooterDefault />
    </>
  );
}
