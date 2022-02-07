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
  departement: Schema.Types.Mixed,
  region: Schema.Types.Mixed
});

PostalCodeSchema.index({location: '2dsphere'});
