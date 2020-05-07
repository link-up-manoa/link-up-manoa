import React from 'react';
import { Card, Image, Rating, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Sessions } from '../../api/session/Session';

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
            <Card.Header>{this.props.sesh.topic}</Card.Header>
            <Card.Meta>{this.props.sesh.date}</Card.Meta>
            <Card.Description>
              Location: {this.props.sesh.place}
              <br/>
              Members: {this.props.sesh.members}
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
            <Button color='red' onClick={() => this.removeItem(this.props.user._id)}>
              Decline
            </Button>
          </Card.Content>
        </Card>

    );
  }
}

/** Require a document to be passed to this component. */
CalenCard.propTypes = {
  sesh: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(CalenCard);
