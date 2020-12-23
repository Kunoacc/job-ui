import { Person } from './person.interface'
import { Opportunity } from './opportunity.interface'

export interface Company {
  name: string;
  logo?: string | null;
  people?: Person[]
  profile?: CompanyProfile;
  Opportunity?: Opportunity
}

export interface CompanyProfile {
  id: number;
  culture: string | null;
  summary: string | null;
  companyId: number;
}