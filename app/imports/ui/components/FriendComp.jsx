import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Friends } from '../../api/stuff/Friends';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class FriendComp extends React.Component {

  removeItem(docID) {
    /* eslint-disable-next-line */
    if (confirm("Do you want to delete this contact?") == true) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log('Item to delete: ${docID}');
      Friends.remove(docID);
    }
  }

  render() {
    return (
        <Card>
          <Card.Content>
            <Image src={this.props.friend.image}/>
            <Card.Header>{this.props.friend.firstName} {this.props.friend.lastName}</Card.Header>
            <Card.Meta>{this.props.friend.major}</Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Rating icon='star' defaultRating={3} maxRating={5} />
          </Card.Content>
          <Card.Content extra>
            <Button onClick={() => this.removeItem(this.props.friend._id)}>
              Remove Friend
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

  /** Require a document to be passed to this component. */
  Friend.propTypes = {
    friend: PropTypes.object.isRequired,
  };

  /** Wrap this component in withRouter since we use the <Link> React Router element. */
  export default withRouter(FriendComp);
