import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Users } from '../../api/user/User';
import { Classes } from '../../api/class/Classes';
import { Sessions } from '../../api/session/Session';
import { Notes } from '../../api/note/Notes';
import { History } from '../../api/history/History';
import { Group } from '../../api/group/Group';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('User', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Users.find({ owner: username });
  }
  return this.ready();
});
Meteor.publish('UserAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Users.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Classes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Classes.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('History', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return History.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('ClassAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Classes.find();
  }
    return this.ready();
  });


Meteor.publish('Session', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Sessions.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Notes', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Notes.find({ owner: username });
  }
  return this.ready();
});


Meteor.publish('Group', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Group.find({ owner: username });
  }
  return this.ready();
});