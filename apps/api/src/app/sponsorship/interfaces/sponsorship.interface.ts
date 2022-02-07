import { Document } from 'mongoose';

export interface Sponsorship extends Document {
  readonly civility?: string;
  readonly lastName?: string;
  readonly firstName?: string;
  readonly mandate?: string;
  readonly district?: string;
  readonly department?: string;
  readonly candidate?: string;
  readonly date?: string;
}
