# Design Sync — Side-by-Side Compare

A new admin tool at `/admin/design-sync` that shows the reference site (omnidx.academy) on the left and your matching project section on the right, switched via a section picker.

## Layout

```text
┌────────────────────────────────────────────────────────────────┐
│  Design Sync   [ Section: Hero ▼ ]   [ Reload ]   [ Open live] │
├──────────────────────────────┬─────────────────────────────────┤
│ REFERENCE (omnidx.academy)   │ YOURS (this project)            │
│ ┌──────────────────────────┐ │ ┌─────────────────────────────┐ │
│ │  iframe → #hero          │ │ │  <HeroSection />            │ │
│ │  (or screenshot if       │ │ │  rendered in isolation      │ │
│ │   X-Frame blocked)       │ │ │                             │ │
│ └──────────────────────────┘ │ └─────────────────────────────┘ │
└──────────────────────────────┴─────────────────────────────────┘
```

Two equal columns, each scrollable independently. Sticky toolbar on top with the section dropdown.

## Section mapping (hardcoded, easy to edit)

A single file `src/config/design-sync.ts` exporting an array — edit this to add/remove sections:

```ts
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
// ...

export const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    refUrl: "https://www.omnidx.academy/#",   // anchor to scroll iframe to
    fallbackImage: "/design-sync/hero.png",   // shown if iframe blocked
    Component: HeroSection,
  },
  { id: "about",     label: "Մեր մասին",      refUrl: ".../#about",        fallbackImage: "/design-sync/about.png",     Component: AboutSection },
  { id: "courses",   label: "Դասընթացներ",    refUrl: ".../#courses",      fallbackImage: "/design-sync/courses.png",   Component: CoursesSection },
  { id: "team",      label: "Թիմ",            refUrl: ".../#specialists",  fallbackImage: "/design-sync/team.png",      Component: TeamSection },
  { id: "faq",       label: "Q&A",            refUrl: ".../#faq",          fallbackImage: "/design-sync/faq.png",       Component: FAQSection },
  { id: "contact",   label: "Կապ",            refUrl: ".../#contact",      f