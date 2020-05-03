import React from 'react';
import { Meteor } from 'meteor/meteor';
// import _ from 'underscore@1.0.10';
import { Container, Header, Loader, Card} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { Classes } from '../../api/class/Classes';
import UserAdminCard from '../components/UserAdminCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserAdminPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>User Admin Page</Header>
            <Card.Group>
              {this.props.users.map((user, index) => <UserAdminCard key={index} user={user}
                                                                    classes={this.props.classes.filter(obj => obj.owner
                                                                        .includes(user.owner))}
                                                                    Users={Users}
                                                                    />)}
            </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserAdminPage.propTypes = {
  users: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UserAdmin');
  const subscription2 = Meteor.subscribe('ClassAdmin');
  return {
    users: Users.find({}).fetch(),
    classes: Classes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserAdminPage);
