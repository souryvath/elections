import { PresidentialCandidate } from "../interfaces/presidential.interface";

export interface PresidentialDTO {
  readonly code?: string;
  readonly name?: string;
  readonly place?: Object;
  readonly nbrSubscriptions?: Number;
  readonly nbrAbsents?: Number;
  readonly pctAbsentOnSubscriptions?: Number;
  readonly nbrVotes?: Number;
  readonly pctVotesOnSubscriptions?: Number;
  readonly nbrWhiteVotes?: Number;
  readonly pctWhiteVotesOnSubscriptions?: Number;
  readonly pctWhiteVotesOnVotes?: Number;
  readonly nbrNullVotes?: Number;
  readonly nbrNullVotesOnSubscriptions?: Number;
  readonly nbrNullVotesOnVotes?: Number;
  readonly nbrExprimatedVotes?: Number;
  readonly nbrExprimatedVotesOnSubscriptions?: Number;
  readonly nbrExprimatedVotesOnVotes?: Number;
  readonly candidates?: PresidentialCandidate[];
  readonly round?: string;
  readonly location?: Location;
}
