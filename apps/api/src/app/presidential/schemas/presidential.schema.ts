import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const PresidentialSchema = new mongoose.Schema({
  code: String,
  name: String,
  place: Schema.Types.Mixed,
  nbrSubscriptions: Number,
  nbrAbsents: Number,
  pctAbsentOnSubscriptions: Number,
  nbrVotes: Number,
  pctVotesOnSubscriptions: Number,
  nbrWhiteVotes: Number,
  pctWhiteVotesOnSubscriptions: Number,
  pctWhiteVotesOnVotes: Number,
  nbrNullVotes: Number,
  nbrNullVotesOnSubscriptions: Number,
  nbrNullVotesOnVotes: Number,
  nbrExprimatedVotes: Number,
  nbrExprimatedVotesOnSubscriptions: Number,
  nbrExprimatedVotesOnVotes: Number,
  candidates: [Schema.Types.Mixed],
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  round: String
});
PresidentialSchema.index({location: '2dsphere'});
