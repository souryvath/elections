import * as mongoose from 'mongoose';

export const SponsorshipSchema = new mongoose.Schema({
  civility: String,
  lastName: String,
  firstName: String,
  mandate: String,
  district: String,
  department: String,
  departmentCode: String,
  departmentNumberSponsorship: Number,
  candidate: String,
  slugCandidate: String,
  date: String
});

SponsorshipSchema.index({location: '2dsphere'});
