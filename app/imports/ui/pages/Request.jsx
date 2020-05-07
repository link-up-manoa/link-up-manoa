import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { RequestCard } from '../components/RequestCard';

/** Renders a table containing all of the friends documents. */
class Request extends React.Component {

  /** Render the page once subscriptions have been received. */
  // eslint-disable-next-line consistent-return
  render() {
    let newList = [];
    newList = this.props.users.filter((user) => user.fType === 'pending');
      return (
          <Container>
            <Card.Group>
            {newList.map((user) => <RequestCard key={user._id} user={user}/>)}
            </Card.Group>
          </Container>
      );
  }
}

/** Require an array of Stuff documents in the props. */
Request.propTypes = {
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
})(Request);
