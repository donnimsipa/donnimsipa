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

export interface SiteCertification {
  title: string;
  image?: string;
}

export type SiteSkills = string[];

export interface SiteSections {
  portfolio?: string;
  download_cv?: string;
  about?: string;
  experience?: string;
  case_studies?: string;
  case_studies_headline?: string;
  case_studies_description?: string;
  back_to_case_studies?: string;
  view_portfolio?: string;
  projects?: string;
  skills?: string;
  certifications?: string;
}

export interface SiteData {
  name: string;
  siteName?: string;
  siteNavbar?: string;
  siteUrl?: string;
  headline: string;
  about: string;
  about_tagline?: string;
  sections?: SiteSections;
  experience: SiteExperience[];
  projects: SiteProject[];
  skills: SiteSkills;
  certifications: SiteCertification[];
  contact: SiteContact;
}
