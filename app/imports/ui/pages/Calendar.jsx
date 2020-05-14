import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Feed, Header, Card, Grid, Checkbox, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/Session';
import { Notes } from '../../api/note/Notes';
import { Reminders } from '../../api/stuff/Reminders';
import ReminderList from '../components/ReminderList';
import CalenCard from '../components/CalenCard';
import { _ } from 'meteor/underscore';


const defaultSession = [
  { username: 'johnfoo', time: '300', date: '05/02/2020 03:30 PM', place: 'Hamilton Library',
    members: 'Jatin, Kameron, Taylor, Aubrie', topic: 'Back-end', questions: 'What materials do we need?',
    owner: 'john@foo.com',
  },
];


/** Renders a table containing all of the friends documents. */
class Calendar extends React.Component 

constructor(props) {
    super(props);
    this.state = { choices: [] };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    let sessionsToView = this.props.sessions;
    sessionsToView = _.filter(sessionsToView, (session) => {
      if (this.state.choices.length === 0) {
        return true;
      }
      console.log(session.topic, this.state.choices);
      return _.contains(this.state.choices, session.topic);
    });
  
    return (
        <Grid container columns={1} celled='internally'>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Scheduled Sessions</Header>
              <Card.Group itermsPerRow={4}>
                {sessionsToView.map((session, index) => <CalenCard 
                    key={index} 
                    session={session}
                    notes={this.props.notes.filter(note => (note.contactId === contact._id))}/>)}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <ReminderList reminders={Reminders}/>
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
