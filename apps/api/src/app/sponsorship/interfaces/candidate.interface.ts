import { Sponsorship } from "./sponsorship.interface";

export interface Candidate {
  readonly name?: string;
  readonly slug?: string;
  readonly numberSponsorships?: Number;
  readonly sponsorships?: Sponsorship[];
  readonly numberDepartments?: Number;
  readonly hasTenPercent?: Boolean;
  readonly timeline?: Timeline[];
}

export interface DepartmentCandidate {
  name?: string;
  code?: string;
  value?: Number;
  percent?: Number;
}

export interface Timeline {
  date?: string;
  value?: Number;
}
