import { Mongo } from 'meteor/mongo';
import Schema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const FriendRequests = new Mongo.Collection('FriendRequests');

/** Define a schema to specify the structure of each document in the collection. */
const FriendRequestSchema = new Schema({
  requester: {
    type: Number,
    required: true,
  },
  recipient: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
FriendRequests.attachSchema(FriendRequestSchema);

/** Make the collection and schema available to other code. */
export { FriendRequests, FriendRequestSchema };
