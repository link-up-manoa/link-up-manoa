import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Friends = new Mongo.Collection('Friends');

/** Define a schema to specify the structure of each document in the collection. */
const FriendsSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  major: String,
  image: String,
  owner: String,
  User: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Friends.attachSchema(FriendsSchema);

/** Make the collection and schema available to other code. */
export { Friends, FriendsSchema };
