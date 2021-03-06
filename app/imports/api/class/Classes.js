import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Classes = new Mongo.Collection('Classes');

/** Define a schema to specify the structure of each document in the collection. */
const ClassSchema = new SimpleSchema({
  classAlpha: String,
  classNum: Number,
  status: {
    type: String,
    allowedValues: ['Currently-Taking', 'Taken'],
  },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Classes.attachSchema(ClassSchema);

/** Make the collection and schema available to other code. */
export { Classes, ClassSchema };
