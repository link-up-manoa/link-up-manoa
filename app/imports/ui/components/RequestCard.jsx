import React from 'react';
import { Button } from 'semantic-ui-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class RequestCard extends React.Component {

  myfunc = docID => {
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
        <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={this.props.users.image} />
              </ListItemAvatar>
              <ListItemText
                  primary="{this.props.users.firstName} {this.props.users.lastName}"
                  secondary={
                    <React.Fragment>
                      <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                      >
                        {this.props.users.mType}
                      </Typography>
                      {"{this.props.users.rating}"}
                    </React.Fragment>
                  }>
              </ListItemText>
              <ListItemSecondaryAction>
                <Button.Group floated='right'>
                  {/* eslint-disable-next-line max-len */}
                  <Button color='green' type='submit' id='add' onClick={this.myfunc}>
                    Accept
                  </Button>
                  <Button color='red' id='remove' onClick={() => this.removeItem(this.props.users._id)}>
                    Decline
                  </Button>
                </Button.Group>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
RequestCard.propTypes = {
  users: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RequestCard);
