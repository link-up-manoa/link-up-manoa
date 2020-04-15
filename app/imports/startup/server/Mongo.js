import { Meteor } from 'meteor/meteor';
import { Friends } from '../../api/stuff/Friends.js';
import { Stuffs } from '../../api/stuff/Stuff';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default friends document. */
function addFriend(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Friends.insert(data);
}

/** Initialize the collection if empty. */
if (Friends.find().count() === 0) {
  if (Meteor.settings.defaultFriends) {
    console.log('Creating friend data');
    Meteor.settings.defaultFriends.map(data => addFriend(data));
  }
}
