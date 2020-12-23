interface Aggregators {
}

interface PersonContext {
    signaled?: any;
}

interface PersonCriteria {
    names: string[];
}

interface Person {
    name: string;
}

interface PersonInput {
    criteria: PersonCriteria;
    person: Person;
}

interface Compensations {
  amount: number;
  currency: string;
  periodicity: string;
}

interface PersonSkill {
    name: string;
    weight: number;
}

export interface PersonResult {
    context: PersonContext;
    _meta: any;
    compensations: Record<string, Compensations>;
    locationName: string;
    name: string;
    openTo: string[];
    picture: string;
    professionalHeadline: string;
    remoter: boolean;
    skills: PersonSkill[];
    subjectId: string;
    username: string;
    verified: boolean;
    weight: number;
}

export interface PersonSearchApiResponse {
    aggregators: Aggregators;
    offset: number;
    results: PersonResult[];
    size: number;
    total: number;
}

interface Organization {
  id: number;
  name: string;
  picture: string;
}

interface Data {
  code: string;
  currency: string;
  minAmount: number;
  maxAmount: number;
  periodicity: string;
}

interface Compensation {
  data: Data;
  visible: boolean;
}

interface Skill {
  name: string;
  experience: string;
}

interface Member {
  subjectId: string;
  name: string;
  username: string;
  professionalHeadline: string;
  picture: string;
  member: boolean;
  manager: boolean;
  poster: boolean;
  weight: number;
}

interface Question {
  id: string;
  text: string;
  date: Date;
}

interface Context {
  signaled: any[];
}

interface Opportunity {
  completion: number;
}

interface Input {
  criteria?: any;
  opportunity: Opportunity;
}

interface And {
  [`@type`]: string;
  id: string;
  input: Input;
  score: number;
}

interface Scorer {
  [`@type`]: string;
  score: number;
  and: And[];
}

interface Meta {
  rank: number;
  scorer: Scorer;
  filter?: any;
  boosters: string[];
}

export interface OpportunityResult {
  id: string;
  objective: string;
  type: string;
  organizations: Organization[];
  locations: string[];
  remote: boolean;
  external: boolean;
  deadline?: Date;
  status: string;
  compensation: Compensation;
  skills: Skill[];
  members: Member[];
  questions: Question[];
  context: Context;
  _meta: Meta;
}

export interface OpportunitySearchApiResponse {
  aggregators: Aggregators;
  offset: number;
  results: OpportunityResult[];
  size: number;
  total: number;
}




