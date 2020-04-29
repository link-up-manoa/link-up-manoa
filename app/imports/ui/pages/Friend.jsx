import React from 'react';
import { Card, Fragment, Rating } from 'semantic-ui-react';



const defaultFriends = [
  {
    firstName: 'Taylor',
    lastName: 'Gabatino',
    major: 'Computer Science',
    image: 'http://getdrawings.com/free-icon/business-woman-icon-74.png',
    owner: 'john@foo.com',
    User: 'friends'
  },
  {
    firstName: 'Jatin',
    lastName: 'Pandya',
    major: 'Computer Science',
    image: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png',
    owner: 'john@foo.com',
    User: 'friends'
  },
  {
    firstName: 'Kameron',
    lastName: 'Wong',
    major: 'Computer Science',
    image: 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png',
    owner: 'john@foo.com',
    User: 'pending'
  },
  {
    firstName: 'Aubrie',
    lastName: 'Usui',
    major: 'Computer Science',
    image: 'http://getdrawings.com/free-icon/business-woman-icon-74.png',
    owner: 'john@foo.com',
    User: 'requests'
  },
]

/** Renders a table containing all of the friends documents. */
class Friend extends React.Component {
const newList;
  newList = {_.filter(defaultFriends, function(user){return user === 'friends'})};

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
      <Card.Group doubling itemsPerRow={3}>
        <Card key={newList.firstName}>
          <Image src={newList.image}/>
          <Card.Content>
            <Fragment>
              <Card.Header>{newList.firstName} {newList.lastName}</Card.Header>
              <Card.Meta>{newList.major}</Card.Meta>
            </Fragment>
          </Card.Content>

          <Card.Content extra>
            <Rating icon='star' defaultRating={3} maxRating={5} />
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}

export default Friend;
