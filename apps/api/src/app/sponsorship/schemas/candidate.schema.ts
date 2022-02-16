import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const CandidateSchema = new mongoose.Schema({
  name: String,
  slug: String,
  numberSponsorships: Number,
  sponsorships: [Schema.Types.Mixed],
  numberDepartments: Number,
  hasTenPercent: Boolean,
  departments: [Schema.Types.Mixed],
  timeline: [Schema.Types.Mixed]
});

CandidateSchema.index({location: '2dsphere'});
