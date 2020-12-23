import { Interest, Skills } from './skill.interface'
import { Experience } from './experience.interface'
import { Company } from './company.interface'
import { Opportunity } from './opportunity.interface'

export interface Person {
  name: string;
  phone?: string;
  picture: string;
  headline?: string;
  username: string;
  links?: string;
  bio?: string;
  profileWeight?: number;
  location?: string;
  timezone?: string;
  isVerified: boolean;
  fullyFetched?: boolean;
  generatedAt?: string | Date;
  updatedAt?: string | Date;
  createdAt?: string | Date;
  preferredJobCompensationCurrency?: string;
  preferredJobCompensationAmount?: number;
  preferredJobCompensationCycle?: string;
  preferredGigCompensationCurrency?: string;
  preferredGigCompensationAmount?: number;
  preferredGigCompensationCycle?: string;
  isOpenToInterships?: boolean;
  isOpenToMentoring?: boolean;
  isOpenToGigs?: boolean;
  isOpenToJobs?: boolean;
  skills?: Skills[];
  experiences?: Experience[];
  interests?: Interest[];
  companies?: Company[];
  Opportunity?: Opportunity;
}