import React from 'react';
import { Card, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Sessions } from '../../api/session/Session';
import AddNote from './AddNote';
import Note from './Note';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class CalenCard extends React.Component {

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

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.sesh.subject}</Card.Header>
            <Card.Meta>{this.props.sesh.date}</Card.Meta>
            <Card.Description>
              Location: {this.props.sesh.location}
              <br/>
              Members: {this.props.sesh.usersAttending.map((user, index) => <p key={index}>{user}</p>)}
            </Card.Description>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
CalenCard.propTypes = {
  sesh: PropTypes.object.isRequired,
};

