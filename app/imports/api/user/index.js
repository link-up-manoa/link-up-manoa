import async from 'async';
import * as router from './.staging/ajv-4309e9b3/dist/ajv.bundle';
import { Users } from './User';
import routes from './routes/myroute';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
    return res.redirect('/fail');

}
routes(ensureAuthenticated);

router.get('/search', ensureAuthenticated, function (req, res) {
  let searchfriend = req.body.searchfriend;
  if (searchfriend) {
    const mssg = '';
    if (searchfriend === req.user.username) {
      searchfriend = null;
    }
    Users.find({ username: { $ne: req.user.username } }, function (err, result) {
      if (err) throw err;
      res.render('search', {
        result: result,
        mssg: mssg,
      });
    });
  }
  async.parallel([
// this function is updated for the receiver of the friend request when it is accepted
    function (callback) {
      if (req.body.senderId) {
        Users.update({
          _id: req.user._id,
          'friendsList.friendId': { $ne: req.body.senderId },
        }, {
          $push: {
            friendsList: {
              friendId: req.body.senderId,
              friendName: req.body.senderName,
            },
          },
          $pull: {
            request: {
              userId: req.body.senderId,
              username: req.body.senderName,
            },
          },
          $inc: { totalRequest: -1 },
        }, (err, count) => {
          callback(err, count);
        });
      }
    },
// this function is updated for the sender of the friend request when it is accepted by the receiver
    function (callback) {
      if (req.body.senderId) {
        Users.update({
          _id: req.body.senderId,
          'friendsList.friendId': { $ne: req.user._id },
        }, {
          $push: {
            friendsList: {
              friendId: req.user._id,
              friendName: req.user.username,
            },
          },
          $pull: {
            sentRequest: {
              username: req.user.username,
            },
          },
        }, (err, count) => {
          callback(err, count);
        });
      }
    },
    function (callback) {
      if (req.body.user_Id) {
        Users.update({
          _id: req.user._id,
          'request.userId': { $eq: req.body.user_Id },
        }, {
          $pull: {
            request: {
              userId: req.body.user_Id,
            },
          },
          $inc: { totalRequest: -1 },
        }, (err, count) => {
          callback(err, count);
        });
      }
    },
    function (callback) {
      if (req.body.user_Id) {
        Users.update({
          _id: req.body.user_Id,
          'sentRequest.username': { $eq: req.user.username },
        }, {
          $pull: {
            sentRequest: {
              username: req.user.username,
            },
          },
        }, (err, count) => {
          callback(err, count);
        });
      }
    },
  ], (err, results) => {
    res.redirect('/search');
  });
});
