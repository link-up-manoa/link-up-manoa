import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Button, List, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';

/** Renders a table containing all of the friends documents. */
class Request extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          {this.props.users.map((user) => <RequestCard key={user._id} user={user}/>)}
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
    user: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Request);
