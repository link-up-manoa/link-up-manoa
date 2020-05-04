import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Rating, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';
import swal from 'sweetalert';
// import FriendComp from '../components/FriendComp';

/** Renders a table containing all of the friends documents. */
class Pending extends React.Component {

  removeItem(docID) {
    swal({
      title: 'Do you really want to delete this Friend?',
      text: 'You will not be able to recover this Friend!',
      type: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal('Deleted!', 'Your Friend has been deleted.',
            'success').then(Friends.remove(docID));
      } else {
        swal('Cancelled', 'User has not been deleted', 'error');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        <Card.Group>
          <Card>
            <Card.Content>
              <Image src='http://getdrawings.com/free-icon/business-woman-icon-74.png'/>
              <Card.Header>Taylor Gabatino</Card.Header>
              <Card.Meta>Computer Science</Card.Meta>
              <Card.Description>Request is still pending...</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Rating icon='star' defaultRating={3} maxRating={5}/>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => this.removeItem(this.props.friend._id)}>
                Unrequest Friend
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Pending.propTypes = {
  friend: PropTypes.array.isRequired,
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
