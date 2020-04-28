import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';

/** Renders a table containing all of the friends documents. */
class Calendar extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Calendar Reminders</Header>
          <Feed>
            {this.props.feeds.map((feed, index) => <Feed key={index} feed={feed}/>)}
          </Feed>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Calendar.propTypes = {
  feed: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Feeds');
  return {
    feed: Feeds.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Calendar);
