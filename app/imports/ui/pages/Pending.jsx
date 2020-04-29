import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Container, Image, Rating, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';
// import FriendComp from '../components/FriendComp';

/** Renders a table containing all of the friends documents. */
class Pending extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group itemsPerRow={3}>
            <Card>
              <Card.Content>
                <Image src='http://getdrawings.com/free-icon/business-woman-icon-74.png'/>
                <Card.Header>Aubrie Usui</Card.Header>
                <Card.Meta>Computer Science</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Rating icon='star' defaultRating={3} maxRating={5} />
              </Card.Content>
              <Card.Content extra>
                <Button onClick={() => this.removeItem(this.props.friends._id)}>
                  Remove Friend
                </Button>
              </Card.Content>
            <Card.Description>Still Pending...</Card.Description>
            </Card>
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Pending.propTypes = {
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
})(Pending);
