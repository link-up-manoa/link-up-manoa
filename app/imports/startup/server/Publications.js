import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Users } from '../../api/user/User';
import { Classes } from '../../api/class/Classes';
import { Friends } from '../../api/stuff/Friends';

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

Meteor.publish('Friends', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Friends.find({ owner: username });
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

Meteor.publish('ClassAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Classes.find();
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('FriendsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Friends.find();
  }
  return this.ready();
});
