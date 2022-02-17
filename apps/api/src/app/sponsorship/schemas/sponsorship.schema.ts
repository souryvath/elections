import * as mongoose from 'mongoose';

export const SponsorshipSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  mandate: String,
  district: String,
  department: String,
  departmentSlug: String,
  departmentCode: String,
  candidate: String,
  slugCandidate: String,
  date: String,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
});

SponsorshipSchema.index({location: '2dsphere'});
