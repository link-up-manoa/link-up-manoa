import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Button, List, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';

/** Renders a table containing all of the friends documents. */
class Request extends React.Component {

  state = { activeItem: 'friends' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
            'success').then(Users.remove(docID));
      } else {
        swal('Cancelled', 'User has not been deleted', 'error');
      }
    });
  }


  addUser(docID) {
    console.log(`  Adding: ${docID.firstName} ${docID.lastName} (${docID.owner})`);
    Users.assign()
    Users.insert(docID);
  }


  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <List>
          <div className="clearfix">
            <a>
              <Image size='tiny' src='http://getdrawings.com/free-icon/business-woman-icon-74.png' circular/>
              <span>Aubrie Usui</span>
              <Button.Group floated='right'>
                <Button color='green' name="actions[accept]" type="submit" onClick="myRequests()">
                  Accept
                </Button>
                <Button.Or/>
                <Button color='red' name="actions[reject]" type="submit" onClick="myRequests()">
                  Decline
                </Button>
              </Button.Group>
            </a>
            <a>
              <Image size='tiny' src='' circular/>
              <span>Taylor Gabatino</span>
              <Button.Group floated='right'>
                <Button color='green' onClick={() => this.addUser(this.props.user._id)}>
                  Accept
                </Button>
                <Button color='red' onClick={() => this.removeItem(this.props.user._id)}>
                  Decline
                </Button>
              </Button.Group>
            </a>
          </div>
        </List>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Request.propTypes = {
  user: PropTypes.array.isRequired,
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
