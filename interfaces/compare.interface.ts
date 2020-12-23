import { Experience } from "./experience.interface";
import { Person } from "./person.interface";
import { Interest } from "./skill.interface";

export interface ComparePeople {
  preferredIndex: string | unknown;
  compared: Record<string, PeopleComparisonData>;
}

export interface PeopleComparisonData extends Person {
  employmentDuration?: string;
  confidenceScore?: number;
  numberOfOpportunities?: string;
  topFiveSkills?: Strength[];
  skillsBreakdown?: string;
  topFiveInterests?: Interest[];
  longestExperience?: Experience;
  mostRecentEducation?: Education;
}

export interface Strength {
  id: string;
  code: number;
  name: string;
  weight: number;
  recommendations: number;
  media: any[];
  created: Date;
  additionalInfo: string;
}

export interface Education {
  id: string;
  category: string;
  name: string;
  organizations?: any[];
  responsibilities: any[];
  fromMonth: string;
  fromYear: string;
  remote: boolean;
  additionalInfo: string;
  highlighted: boolean;
  weight: number;
  verifications: number;
  recommendations: number;
  media: any[];
  rank: number;
}