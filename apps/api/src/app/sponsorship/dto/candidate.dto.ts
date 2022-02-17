import { DepartmentCandidate, Timeline } from '../interfaces/candidate.interface';
import { Sponsorship } from './../interfaces/sponsorship.interface';

export interface CandidateDTO {
  readonly name?: string;
  readonly slug?: string;
  readonly party?: string;
  readonly numberSponsorships?: Number;
  readonly sponsorships?: Sponsorship[];
  readonly numberDepartments?: Number;
  readonly hasTenPercent?: Boolean;
  readonly departments?: DepartmentCandidate[];
  readonly timeline?: Timeline[];
}
