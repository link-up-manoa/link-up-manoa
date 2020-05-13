import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class RequestCard extends React.Component {

  myfunc(docID) {
      this.add.setAttribute('disabled', 'disabled');
      this.props.user.fType.set(fType, 'friend');
      Users.insert(docID);
  }

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

  render() {
    return (
        <Card>
          <Card.Content>
            <Image src={this.props.user.image}/>
            <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
            <Card.Meta>{this.props.user.mType} -- {this.props.user.dType}</Card.Meta>
            <Card.Description>{this.props.user.rating}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group>
              <Button color='green' type='button' id='add' className='btn-success' onClick={() => this.myfunc(this.props.user._id)}>
                Accept
              </Button>
              <Button.Or/>
              <Button color='red' id='remove' onClick={() => this.removeItem(this.props.user._id)}>
                Decline
              </Button>
            </Button.Group>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
RequestCard.propTypes = {
  user: PropTypes.object.isRequired,
}
