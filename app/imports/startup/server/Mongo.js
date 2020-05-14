import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Users } from '../../api/user/User.js';
import { Sessions } from '../../api/session/Session';
import { History } from '../../api/history/History';

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
    console.log('Creating default users.');
    Meteor.settings.defaultUsers.map(data => addUser(data));
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

/** Initialize the database with a default history document. */
function addHistory(data) {
  console.log(`  Adding: ${data.topic} (${data.owner})`);
  History.insert(data);
}

/** Initialize the collection if empty. */
if (History.find().count() === 0) {
  if (Meteor.settings.defaultHistory) {
    console.log('Creating History data');
    Meteor.settings.defaultHistory.map(data => addHistory(data));

  }
}
