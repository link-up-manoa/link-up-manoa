import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Feeds = new Mongo.Collection('Feeds');

/** Define a schema to specify the structure of each document in the collection. */
const FeedsSchema = new SimpleSchema({
  username: String,
  time: Number,
  date: Date,
  place: String,
  topic: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Feeds.attachSchema(FeedsSchema);

/** Make the collection and schema available to other code. */
export { Feeds, FeedsSchema };