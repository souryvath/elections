import { Document } from 'mongoose';

export interface PostalCode extends Document {
  readonly name?: string;
  readonly postalCode?: string;
  readonly insee?: string;
  readonly slug?: string;
  readonly location?: Location;
  readonly departement?: Object;
}
