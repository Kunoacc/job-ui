import { Company } from "./company.interface";
import { Person } from "./person.interface";
import { Skills } from "./skill.interface";

export interface Opportunity {
  id: number;
  uid: string;
  title: string;
  isReviewed: boolean;
  benefits: string | null;
  responsibilities: string | null;
  structure: string | null;
  location: string | null;
  deadline: Date;
  type: string;
  minSalaryRange: number | null;
  maxSalaryRange: number | null;
  compensationPeriod: string | null;
  compensationCurrency: string | null;
  status: string;
  personId: number;
  companyId: number;
  company: Company;
  skills: Skills[];
  poster: Person;
  additionalInformation?: string
  members?: string
  isRemote: boolean
}