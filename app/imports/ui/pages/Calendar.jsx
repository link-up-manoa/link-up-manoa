import React from 'react';
import { withRouter } from 'react-router-dom';
import { Loader, Grid, Header, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddFeed from '../components/AddFeed';

/** Renders a table containing all of the friends documents. */
class Calendar extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid container>
          <Header as="h2" textAlign="center" inverted>Calendar Reminders</Header>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              lists the session
            </Grid.Column>
            <Divider vertical/>
            <Grid.Column width={6}>
              <AddFeed owner={this.props.session.username}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Calendar.propTypes = {
  session: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withRouter(Calendar);
