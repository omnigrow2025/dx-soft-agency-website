import type { ComponentType } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import PartnersSection from "@/components/PartnersSection";
import NewsletterSection from "@/components/NewsletterSection";

export type DesignSyncSection = {
  id: string;
  label: string;
  /** Reference URL with anchor (loaded in iframe) */
  refUrl: string;
  /** Optional fallback screenshot path under /public if iframe is blocked */
  fallbackImage?: string;
  /** Component rendered on the right side */
  Component: ComponentType;
  /** Optional notes about what should match */
  notes?: string;
};

const REF = "https://www.omnidx.academy";

/**
 * Edit this list to add, remove, or re-map sections.
 * Each entry pairs a reference anchor on omnidx.academy with one of your components.
 */
export const DESIGN_SYNC_SECTIONS: DesignSyncSection[] = [
  {
    id: "hero",
    label: "Hero",
    refUrl: `${REF}/#`,
    fallbackImage: "/design-sync/hero.png",
    Component: HeroSection,
    notes: "Green headline, yellow blob behind girl, two floating cards.",
  },
  {
    id: "partners",
    label: "Partners",
    refUrl: `${REF}/#`,
    fallbackImage: "/design-sync/partners.png",
    Component: PartnersSection,
    notes: "Centered partner logos under hero.",
  },
  {
    id: "about",
    label: "About",
    refUrl: `${REF}/#about`,
    fallbackImage: "/design-sync/about.png",
    Component: AboutSection,
    notes: "Image left with yellow blob, copy + bullet list right.",
  },
  {
    id: "courses",
    label: "Courses",
    refUrl: `${REF}/#courses`,
    fallbackImage: "/design-sync/courses.png",
    Component: CoursesSection,
    notes: "Card grid with category filter chips.",
  },
  {
    id: "newsletter",
    label: "Newsletter",
    refUrl: `${REF}/#`,
    fallbackImage: "/design-sync/newsletter.png",
    Component: NewsletterSection,
  },
  {
    id: "team",
    label: "Team",
    refUrl: `${REF}/#specialists`,
    fallbackImage: "/design-sync/team.png",
    Component: TeamSection,
  },
  {
    id: "faq",
    label: "FAQ",
    refUrl: `${REF}/#faq`,
    fallbackImage: "/design-sync/faq.png",
    Component: FAQSection,
  },
  {
    id: "contact",
    label: "Contact",
    refUrl: `${REF}/#contact`,
    fallbackImage: "/design-sync/contact.png",
    Component: ContactSection,
  },
];
