import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Feed, Header, Card, Grid, Checkbox, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/Session';
// import { Study } from '../components/Study';
import { Notes } from '../../api/note/Notes';
// import { Card } from 'semantic-ui-react';
import Note from '../components/Note';
import AddNote from '../components/AddNote';


const defaultSession = [
  { username: 'johnfoo', time: '300', date: '05/02/2020 03:30 PM', place: 'Hamilton Library',
    members: 'Jatin, Kameron, Taylor, Aubrie', topic: 'Back-end', questions: 'What materials do we need?',
    owner: 'john@foo.com',
  },
];
/** Renders a table containing all of the friends documents. */
class Calendar extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        // <Grid container columns={1} celled='internally'>
        //   <Grid.Row>
        //     <Grid.Column>
        //         <Header as="h2" textAlign="center" inverted>Scheduled Sessions</Header>
        //           <Card.Group>
        //           {this.props.sessions.map((sesh, index) => <Study
        //               key={index}
        //               sesh={sesh}
        //               notes={this.props.notes.filter(note => (note.contactId === sesh._id))}/>)}
        //         </Card.Group>
        //     </Grid.Column>
        //   </Grid.Row>
        //
        //    <Grid.Row>
        //     <Grid.Column>
        //       <Header as="h2" textAlign="center" inverted>Reminders!</Header>
        //       <Container>
        //       <Checkbox inverted="true" label='Create study guide of chapter 3'/>
        //       <br/>
        //       <Checkbox inverted="true" label='Bring calculator'/>
        //       <br/>
        //       <Checkbox inverted="true" label='Make diagram for project'/>
        //       <br/>
        //       </Container>
        //     </Grid.Column>
        //    </Grid.Row>
        // </Grid>
        <Grid container columns={1} celled='internally'>
          <Grid.Row>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Scheduled Sessions</Header>
        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Header>{defaultSession.topic}</Card.Header>
              <Card.Meta>{defaultSession.date}</Card.Meta>
              <Card.Description>
                Location: {defaultSession.place}
                <br/>
                Members: {defaultSession.members}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Feed>
                {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
              </Feed>
            </Card.Content>
            <Card.Content extra>
              <AddNote/>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Team Bonding</Card.Header>
              <Card.Meta>05/18/2020 04:00 PM</Card.Meta>
              <Card.Description>
                Location: Zoom online
                <br/>
                Members: Julian, Brooke, Danny
              </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Feed>
                  {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
                </Feed>
              </Card.Content>
              <Card.Content extra>
                <AddNote/>
              </Card.Content>
          </Card>
        </Card.Group>
            </Grid.Column>
          </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Reminders</Header>
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