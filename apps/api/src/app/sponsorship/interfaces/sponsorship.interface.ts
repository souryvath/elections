import { Document } from 'mongoose';

export interface Sponsorship extends Document {
  readonly lastName?: string;
  readonly firstName?: string;
  readonly mandate?: string;
  readonly district?: string;
  readonly department?: string;
  readonly departmentCode?: string;
  readonly departmentNumberSponsorship?: number;
  readonly candidate?: string;
  readonly location?: Location;
  readonly slugCandidate?: string;
  readonly date?: string;
}

export interface Location {
  readonly type?: string;
  readonly coordinates?: number[];
}
