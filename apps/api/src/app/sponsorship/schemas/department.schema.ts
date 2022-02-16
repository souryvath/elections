import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const DepartmentSchema = new mongoose.Schema({
  name: String,
  slug: String,
  code: String,
  sponsorships: [Schema.Types.Mixed],
  numberSponsorships: Number,
  numberCandidates: Number,
  candidates: [Schema.Types.Mixed]
});

DepartmentSchema.index({location: '2dsphere'});
