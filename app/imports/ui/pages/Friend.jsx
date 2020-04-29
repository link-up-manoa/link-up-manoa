import React from 'react';
import { Card, Image, Rating, Button, Container } from 'semantic-ui-react';
// import { Meteor } from 'meteor/meteor';
// import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';

function removeItem(docID) {
  /* eslint-disable-next-line */
  if (confirm("Do you want to delete this contact?") == true) {
    // eslint-disable-next-line no-template-curly-in-string
    console.log('Item to delete: ${docID}');
    Friends.remove(docID);
  }
}

//
// const defaultFriends = [
//   {
//     firstName: 'Taylor',
//     lastName: 'Gabatino',
//     major: 'Computer Science',
//     image: 'http://getdrawings.com/free-icon/business-woman-icon-74.png',
//     owner: 'john@foo.com',
//     User: 'friends'
//   },
//   {
//     firstName: 'Jatin',
//     lastName: 'Pandya',
//     major: 'Computer Science',
//     image: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png',
//     owner: 'john@foo.com',
//     User: 'friends'
//   },
//   {
//     firstName: 'Kameron',
//     lastName: 'Wong',
//     major: 'Computer Science',
//     image: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png',
//     owner: 'john@foo.com',
//     User: 'pending'
//   },
//   {
//     firstName: 'Aubrie',
//     lastName: 'Usui',
//     major: 'Computer Science',
//     image: 'http://getdrawings.com/free-icon/business-woman-icon-74.png',
//     owner: 'john@foo.com',
//     User: 'requests'
//   },
// ]

/** Renders a table containing all of the friends documents. */
class Friend extends React.Component {
// const newList;
//   newList = {_.filter(defaultFriends, function(user){return user === 'friends'})};

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        // <Card key={newList.firstName}>
    //  <Image src={newList.image}/>
    //  <Card.Content>
    //    <Fragment>
    //      <Card.Header>{newList.firstName} {newList.lastName}</Card.Header>
    //      <Card.Meta>{newList.major}</Card.Meta>
    //    </Fragment>
    //  </Card.Content>
    //  <Card.Content extra>
    //    <Rating icon='star' defaultRating={3} maxRating={5} />
    //  </Card.Content>
    // </Card>
        <Card.Group>
    <Card>
      <Card.Content>
        <Image src='https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png'/>
        <Card.Header>Jatin Pandya</Card.Header>
        <Card.Meta>Computer Science</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Rating icon='star' defaultRating={3} maxRating={5}/>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={() => this.removeItem(this.props.friends._id)}>
          Remove Friend
        </Button>
      </Card.Content>
    </Card>

    <Card>
    <Card.Content>
    <Image src='https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png'/>
        <Card.Header>Kameron Wong</Card.Header>
    <Card.Meta>Computer Science</Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Rating icon='star' defaultRating={3} maxRating={5}/>
    </Card.Content>
    <Card.Content extra>
    <Button onClick={() => this.removeItem(this.props.friends._id)}>
    Remove Friend
    </Button>
  </Card.Content>
  </Card>
        </Card.Group>
  ;
  }
}

Friend.propTypes = {
  friends: PropTypes.object.isRequired,
};

export default Friend;
