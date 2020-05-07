import React from 'react';
import { Card, Image, Rating, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class FriendCard extends React.Component {

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
            <Button onClick={() => this.removeItem(this.props.user._id)}>
              Remove Friend
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

  /** Require a document to be passed to this component. */
  FriendCard.propTypes = {
    user: PropTypes.object.isRequired,
  };

  /** Wrap this component in withRouter since we use the <Link> React Router element. */
  export default withRouter(FriendCard);
