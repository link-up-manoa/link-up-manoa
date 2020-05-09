import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Users = new Mongo.Collection('User');

/** Define a schema to specify the structure of each document in the collection. */
const UserSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  image: String,
  rating: String,
  status: {
    type: String,
    allowedValues: ['UG-Student', 'G-Student', 'Advisor'],
    defaultValue: 'UG-Student',
  },
  dType: {
    type: String,
    allowedValues: ['BA', 'BS', 'MA', 'MS', 'PhD'],
    defaultValue: 'BS',
  },
  mType: String,
  owner: String,
  fType: {
    type: [String],
    allowedValues: ['friend', 'pending'],
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Users.attachSchema(UserSchema);

/** Make the collection and schema available to other code. */
export { Users, UserSchema };
