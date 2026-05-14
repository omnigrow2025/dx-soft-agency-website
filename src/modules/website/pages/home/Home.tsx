import { Section } from "../../components/Section";
import { AboutUs } from "./components/sections/AboutUs";
import { Courses } from "./components/sections/Courses";
import { Hero } from "./components/sections/Hero";
import { Trusted } from "./components/sections/Trusted";

export const Home = () => {
  return (
    <div className="gap-4 pb-6 px-6">
      <Section>
        <Hero />
      </Section>
      <Section>
        <Trusted />
      </Section>
      <Section>
        <AboutUs />
      </Section>
      <Section>
        <Courses />
      </Section>
    </div>
  );
};
