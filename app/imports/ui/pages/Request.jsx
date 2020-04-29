import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Button, Container, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';
import FriendComp from '../components/FriendComp';

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
          <Header as="h2" textAlign='center' inverted>
            Friends List
          </Header>
          <Card.Group itemsPerRow={3}>
            {this.props.friends.map((friend, index) => <FriendComp
                key={index}
                friend={friend}/>)}
            <Card.Description>{this.props.friends.firstName} wants to be friends with you!</Card.Description>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='green'>
                  Accept
                </Button>
                <Button basic color='red'>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Request.propTypes = {
  friends: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Friends');
  return {
    friends: Friends.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Request);
