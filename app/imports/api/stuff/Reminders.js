import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Reminders = new Mongo.Collection('Reminders');

/** Define a schema to specify the structure of each document in the collection. */
const ReminderSchema = new SimpleSchema({
  text: String,
  dateCreated: String,
  owner: String,
  checked: Boolean,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Reminders.attachSchema(ReminderSchema);

/** Make the collection and schema available to other code. */
export { Reminders, ReminderSchema };
