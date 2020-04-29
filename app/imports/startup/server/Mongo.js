import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/user/User.js';
import { Friends } from '../../api/stuff/Friends.js';
import { Sessions } from '../../api/session/Session';

>>>>>>> issue-3
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

/** Initialize the database with a default data document. */
function addUser(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} (${data.owner})`);
  Users.insert(data);
}

/** Initialize the collection if empty. */
if (Users.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default data.');
    Meteor.settings.defaultUsers.map(data => addUser(data));
  }
}

/** Initialize the database with a default friends document. */
function addFriend(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} (${data.owner})`);
  Friends.insert(data);
}

/** Initialize the collection if empty. */
if (Friends.find().count() === 0) {
  if (Meteor.settings.defaultFriends) {
    console.log('Creating friend data');
    Meteor.settings.defaultFriends.map(data => addFriend(data));
  }
}

/** Initialize the database with a default friends document. */
function addSession(data) {
  console.log(`  Adding: ${data.topic} (${data.owner})`);
  Sessions.insert(data);
}

/** Initialize the collection if empty. */
if (Sessions.find().count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating Session');
    Meteor.settings.defaultSession.map(data => addSession(data));

  }
}
