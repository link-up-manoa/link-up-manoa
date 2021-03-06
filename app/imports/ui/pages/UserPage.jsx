import React from 'react';
import { Meteor } from 'meteor/meteor';
// import _ from 'underscore@1.0.10';
import { Container, Header, Loader, Card, Image, Button, Icon, Grid, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Users } from '../../api/user/User';
import { Classes } from '../../api/class/Classes';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (this.props.user[0] != null) ? this.renderPage1() : <Header as={'h1'} textAlign='center' inverted>
      Unfortunately your account was deleted if
      you feel this is a mistake please talk to an Advisor</Header>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage1() {
    return (
        <Container>
        <Header as="h2" textAlign="center" inverted>User Page</Header>
          <br></br>
          <Grid centered columns={2}>
            <Grid.Column textAlign="center">
              <div className="ui medium image">
                <img src={this.props.user[0].image}></img>
              </div>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <div className="ui segment">
                <h1>{this.props.user[0].firstName} {this.props.user[0].lastName}</h1>
                <h3>Status: {this.props.user[0].status}</h3>
                <h3>Major: {this.props.user[0].dType} - {this.props.user[0].mType}</h3>
                <h3>Description:</h3>
                <h4>I am an undergraduate student in Computer Science.</h4>
                <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                        exact to={`/editUser/${this.props.user[0]._id}`} key='editUser'>
                  <Icon name='edit' />
                  Edit User
                </Button>
              </div>
            </Grid.Column>
          </Grid>
          <br></br>
        <Grid centered columns={3}>
          <Grid.Column textAlign="center">
            <Item as={NavLink} exact to='/friends'>
              <Icon name="users" size="huge" inverted/>
              <Header as="h2" inverted>My Friends</Header>
            </Item>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Item as={NavLink} exact to='/remind'>
              <Icon name="file alternate" size="huge" inverted/>
              <Header as="h2" inverted>My Reminders</Header>
            </Item>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Item as={NavLink} exact to='/usersessions'>
              <Icon name="book" size="huge" inverted/>
              <Header as="h2" inverted>My Study Sessions</Header>
            </Item>
          </Grid.Column>
        </Grid>
          <br></br>
          <div className="ui horizontal divider">
            <Header as="h2" textAlign="center" inverted>User Feed</Header>
          </div>
          <br></br>
          <div className="ui segment">
          <div className="ui small feed">
            <h4 className="ui header">Friend Activity</h4>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <a>Elliot Fu</a> added <a>Jenny Hess</a> as a friend
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <a>Stevie Feliciano</a> added <a>Elliot Fu</a> as a friend
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <a>Helen Troy</a> added <a>Christian Rocha</a> as a friend
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <a>Christian Rocha</a> signed up for the  site.
                </div>
              </div>
            </div>
          </div>
          </div>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserPage.propTypes = {
  user: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  const subscription2 = Meteor.subscribe('Classes');
  return {
    user: Users.find({}).fetch(),
    classes: Classes.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserPage);
