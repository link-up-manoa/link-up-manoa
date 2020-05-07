import React from 'react';
import { Card, Image, Rating, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { Users } from '../../api/user/User';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class RequestCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { friends: true };
  }

  handleClick() {
    this.setState({
      friends: this.state.friends.map(
          (user) => <Users key={user._id} user={user} />,
      ),
    });
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
        <List>
          <div className="clearfix">
            <a>
              <Image size='tiny' src='http://getdrawings.com/free-icon/business-woman-icon-74.png' circular/>
              <span>{this.props.users.firstName} {this.props.users.lastName}</span>
              <Button.Group floated='right'>
                <Button color='green' name="actions[accept]" type="submit" onClick="myRequests()">
                  Accept
                </Button>
                <Button.Or/>
                <Button color='red' name="actions[reject]" type="submit" onClick="myRequests()">
                  Decline
                </Button>
              </Button.Group>
            </a>
            <a>
              <Image size='tiny' src='' circular/>
              <span>{this.props.users.firstName} {this.props.users.lastName}</span>
              <Button.Group floated='right'>
                <Button color='green' type='submit' id='addfriend' onClick={this.handleClick}>
                  Accept
                </Button>
                <Button color='red' onClick={() => this.removeItem(this.props.user._id)}>
                  Decline
                </Button>
              </Button.Group>
            </a>
          </div>
        </List>
    );
  }
}

/** Require a document to be passed to this component. */
RequestCard.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RequestCard);
