import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Loader, Grid, Header, Checkbox, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/Session';
import { Session } from '../components/Session';
import { Notes } from '../../api/note/Notes';

/** Renders a table containing all of the friends documents. */
class Calendar extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Grid container columns={1} celled='internally'>
          <Grid.Row>
            <Grid.Column>
                <Header as="h2" textAlign="center" inverted>Scheduled Sessions</Header>
                  <Card.Group>
                  {this.props.sessions.map((session, index) => <Session
                      key={index}
                      session={session}
                      notes={this.props.notes.filter(note => (note.contactId === session._id))}/>)}
                </Card.Group>
            </Grid.Column>
          </Grid.Row>

           <Grid.Row>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Reminders!</Header>
              <Container>
              <Checkbox inverted="true" label='Create study guide of chapter 3'/>
              <br/>
              <Checkbox inverted="true" label='Bring calculator'/>
              <br/>
              <Checkbox inverted="true" label='Make diagram for project'/>
              <br/>
              </Container>
            </Grid.Column>
           </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Calendar.propTypes = {
  sessions: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Session');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    sessions: Sessions.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() };
})(Calendar);
