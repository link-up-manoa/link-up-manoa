import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RequestCard extends React.Component {

  myfunc(docID) {
      this.add.setAttribute('disabled', 'disabled');
      this.props.users.status = 'friend';
      Users.insert(docID);
  };

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
        <Item>
          <Item.Image src={this.props.users.image}></Item.Image>
          <Item.Content>
            <Item.Header>{this.props.users.firstName} {this.props.users.lastName}</Item.Header>
            <Item.Meta>{this.props.users.rating}</Item.Meta>
            <Item.Description>{this.props.users.mType} -- {this.props.users.dType}</Item.Description>
            <Item.Extra>
              <Button.Group>
                <Button color='green' type='submit' id='add' onClick={() => this.myfunc(this.props.users._id)}>
                  Accept
                </Button>
                <Button color='red' id='remove' onClick={() => this.removeItem(this.props.users._id)}>
                  Decline
                </Button>
              </Button.Group>
            </Item.Extra>
          </Item.Content>
        </Item>


    );
  }
}

/** Require a document to be passed to this component. */
RequestCard.propTypes = {
  users: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RequestCard);
