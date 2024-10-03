export interface IWork {
  type: string;
  label: string;
  shortDescription: string[];
  longDescription: string[];
  liveLinks?: string[];
  assetLinks?: string[];
  sortOrder: number;
}

export interface IPersonalInfo {
  label: string;
  heading: string[];
  subHeading: string[];
  email: string[];
}

export interface IContactDetail {
  title: string;
  email: string;
  description: string;
}

export interface IProfile {
  title: string;
  description: string;
  link: string;
}

export default interface IPortfolio {
  id: string;
  works: IWork[];
  personalInfo: IPersonalInfo;
  contactDetails: IContactDetail[];
  profiles: IProfile[];
  skills: string[];
}
