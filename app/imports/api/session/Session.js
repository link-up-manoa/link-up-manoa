import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Sessions = new Mongo.Collection('Session');

/** Define a schema to specify the structure of each document in the collection. */
const SessionSchema = new SimpleSchema({
  username: String,
  date: Date,
  place: String,
  members: String,
  topic: String,
  questions: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Sessions.attachSchema(SessionSchema);

/** Make the collection and schema available to other code. */
export { Sessions, SessionSchema };
