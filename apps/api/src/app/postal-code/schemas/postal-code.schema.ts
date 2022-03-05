import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const PostalCodeSchema = new mongoose.Schema({
  name: String,
  postalCode: String,
  insee: String,
  slug: String,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  departementSlug: String,
  regionSlug: String
});

PostalCodeSchema.index({location: '2dsphere'});
