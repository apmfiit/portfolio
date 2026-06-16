// Content is stored as editable JSON under content/data/ (managed via /admin,
// Sveltia CMS). This module assembles those files into the typed exports the
// app consumes — component imports from "@/content" are unchanged.
import vtbPush from "./data/projects/vtb-push-onboarding.json";
import vtbTemplate from "./data/projects/vtb-template-constructor.json";
import loftyHome from "./data/projects/lofty-homepage.json";
import yktJobs from "./data/projects/ykt-jobs.json";
import yktPickup from "./data/projects/ykt-pickup.json";
import experienceData from "./data/experience.json";
import aboutData from "./data/about.json";
import site from "./data/site.json";

export type Locale = "en" | "ru";

export const LOCALES: Locale[] = ["en", "ru"];

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectMeta = {
  role: LocalizedString;
  timeline: LocalizedString;
  team?: LocalizedList;
  skills?: LocalizedList;
  platforms?: LocalizedList;
};

export type SectionImage = {
  src: string;
  caption?: LocalizedString;
};

export type ProjectSection = {
  id: string;
  eyebrow: LocalizedString;
  heading: LocalizedString;
  body?: LocalizedList;
  image?: string;
  caption?: LocalizedString;
  images?: SectionImage[];
};

export type Project = {
  slug: string;
  cover?: string;
  company: string;
  status: LocalizedString;
  year: string;
  headline: LocalizedString;
  blurb: LocalizedString;
  meta?: ProjectMeta;
  sections?: ProjectSection[];
};

export type Experience = {
  year: LocalizedString;
  company: string;
  href?: string;
  role: LocalizedString;
};

export type AboutJob = {
  period: LocalizedString;
  company: string;
  href?: string;
  summary: LocalizedString;
  bullets: LocalizedList;
};

export type AboutAchievement = {
  year: string;
  text: LocalizedString;
  images?: string[];
};

export type About = {
  intro: LocalizedString;
  location: LocalizedString;
  jobs: AboutJob[];
  growth: LocalizedList;
  achievements: AboutAchievement[];
  personal: LocalizedString;
};

export type Links = {
  telegram: string;
  telegramHandle: string;
  email: string;
  cv: string;
};

export type Translations = Record<Locale, Record<string, string>>;

// Order here defines the order projects appear on the home page.
export const projects = [
  vtbPush,
  vtbTemplate,
  loftyHome,
  yktJobs,
  yktPickup,
] as unknown as Project[];

export const experience = experienceData.items as unknown as Experience[];
export const about = aboutData as unknown as About;
export const links = site.links as Links;
export const t = site.t as unknown as Translations;
