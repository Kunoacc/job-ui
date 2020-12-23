export interface Skills {
  id: number;
  recommendations: number | null;
  code: string;
  skillWeight: number | null;
  createdAt: Date;
  updatedAt: Date;
  skillId: number;
  personId: number;
  skill: Skill;
}

export interface Skill {
  id: number;
  code: number;
  name: string;
  opportunityId: number | null;
}

export interface Interest {
  id: number;
  code: string;
  personId: number;
  skillId: number;
  skill: Skill;
}