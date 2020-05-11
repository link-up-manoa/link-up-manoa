import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Group = new Mongo.Collection('Group');

/** Define a schema to specify the structure of each document in the collection. */
const GroupSchema = new SimpleSchema({
  title: String,
  groupMembers: String,
  groupType: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Group.attachSchema(GroupSchema);

/** Make the collection and schema available to other code. */
export { Group, GroupSchema };
