import { CandidateDepartment } from './../interfaces/department.interface';
import { Sponsorship } from './../interfaces/sponsorship.interface';

export interface DepartmentDTO {
  readonly name?: string;
  readonly slug?: string;
  readonly code?: string;
  readonly sponsorships?: Sponsorship[];
  readonly numberSponsorships?: Number;
  readonly candidates?: CandidateDepartment[];
}
