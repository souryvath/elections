import { Sponsorship } from './../interfaces/sponsorship.interface';

export interface Department extends Document {
  readonly name?: string;
  readonly slug?: string;
  readonly code?: string;
  readonly sponsorships?: Sponsorship[];
  readonly numberSponsorships?: Number;
  readonly candidates?: CandidateDepartment[];
}

export interface CandidateDepartment {
  readonly name?: string;
  readonly slug?: string;
  readonly numberSponsorships?: Number[];
}
