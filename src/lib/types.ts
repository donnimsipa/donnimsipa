export interface SiteContact {
  email?: string;
  linkedin?: string;
  website?: string;
}

export interface SiteExperience {
  company: string;
  role: string;
  period: string;
  bullets?: string[];
}

export interface SiteProjectLink {
  text: string;
  url: string;
}

export interface SiteProject {
  title: string;
  highlight?: string;
  link?: string;
  links?: SiteProjectLink[];
}

export type SiteSkills = Record<string, string[]>;

export interface SiteData {
  name: string;
  siteName?: string;
  headline: string;
  about: string;
  experience: SiteExperience[];
  projects: SiteProject[];
  skills: SiteSkills;
  certifications: string[];
  contact: SiteContact;
}
