import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Button, List, Image, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';
// import FriendComp from '../components/FriendComp';

/** Renders a table containing all of the friends documents. */
class Request extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <List>
          <div className="clearfix">
            <a href="">
              <Image size='tiny' src='http://getdrawings.com/free-icon/business-woman-icon-74.png' circular/>
              <span>Aubrie Usui</span>
              <Button.Group className="buttonRequest" floated='right'>
                <Button color='green' name="actions[accept]" type="submit" onClick="myRequests()">
                  Accept
                </Button>
                <Button.Or/>
                <Button color='red' name="actions[reject]" type="submit" onClick="myRequests()">
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
