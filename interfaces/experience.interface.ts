import { Company } from "./company.interface";

export interface Experience {
  [x: string]: any;
  code: string;
  category?: string | null;
  fromDate: Date | string;
  toDate?: Date | string | null;
  role: string;
  location?: string | null;
  responsibilities?: string | null;
  isRemote?: boolean;
  company: Company;
}