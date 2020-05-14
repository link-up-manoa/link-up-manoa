import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Header, Card, Grid, Checkbox, List, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/session/Session';
import { Notes } from '../../api/note/Notes';
import { Reminders } from '../../api/stuff/Reminders';
import Note from './components/Note';
import AddNote from './components/AddNote';
import ReminderList from './components/ReminderList';

/** Renders a table containing all of the friends documents. */
class Calendar extends React.Component {
  
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
            'success').then(Sessions.remove(docID));
      } else {
        swal('Cancelled', 'User has not been deleted', 'error');
      }
    });
  }
  
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
         <Card>
          <Card.Content>
            <Card.Header>Team Bonding</Card.Header>
            <Card.Meta>05/14/2020 4:30 PM</Card.Meta>
            <Card.Description>
              Location: Hamilton Library
              <br/>
              Members: ICS 314 class
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
          <Card.Content extra>
            <Button color='green'>Approve</Button>
            <Button color='red' onClick={() => this.removeItem(this.props.sesh._id)}>
              Decline
            </Button>
          </Card.Content>
        </Card>
          
         <Card>
          <Card.Content>
            <Card.Header>Calculus Functions</Card.Header>
            <Card.Meta>06/01/2020 2:00 PM</Card.Meta>
            <Card.Description>
              Location: Online Zoom Call
              <br/>
              Members: MATH 242 class
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
          <Card.Content extra>
            <Button color='green'>Approve</Button>
            <Button color='red' onClick={() => this.removeItem(this.props.sesh._id)}>
              Decline
            </Button>
          </Card.Content>
        </Card>
          
         <Card>
          <Card.Content>
            <Card.Header>Back-end Engineering</Card.Header>
            <Card.Meta>06/07/2020 10:00 AM</Card.Meta>
            <Card.Description>
              Location: ICS Space POST 318
              <br/>
              Members: Project contributors
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
          <Card.Content extra>
            <Button color='green'>Approve</Button>
            <Button color='red' onClick={() => this.removeItem(this.props.sesh._id)}>
              Decline
            </Button>
          </Card.Content>
        </Card>
        </Card.Group>
            </Grid.Column>
          </Grid.Row>

        <Grid.Row>
          <List divided relaxed>
            <List.Item>
              <Checkbox/>
              <List.Content>
                <List.Header as='p'>Finish Reading Chapter 3!</List.Header>
                <List.Description>Due: Friday 5/14</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>

              <List.Content>
                <Checkbox/>
                <List.Header as='p' color={'white'}>
                  Study for Johnson's WOD!</List.Header>
                <List.Description >Due: Tuedsday 5/19</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <Checkbox/>
              <List.Content>
                <List.Header as='p'>Work on Final project Website!</List.Header>
                <List.Description>Due: Wednesday 5/13</List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Calendar.propTypes = {
  sesh: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('Session');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    sesh: Sessions.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() };
})(Calendar);
