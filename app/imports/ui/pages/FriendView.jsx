import React from 'react';
import { Card, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { FriendCard } from '../components/FriendCard';

/** Renders a table containing all of the friends documents. */
class FriendView extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  // eslint-disable-next-line consistent-return
  render() {
    let newList = [];
    newList = this.props.users.filter((user) => user.fType === 'friend');
      return (
          <Container>
            <Card.Group>
              {newList.map((user) => <FriendCard key={user._id} user={user}/>)}
            </Card.Group>
          </Container>
      );
  }
}

FriendView.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  return {
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FriendView);
