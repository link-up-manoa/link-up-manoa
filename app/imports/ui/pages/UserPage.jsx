import React from 'react';
import { Meteor } from 'meteor/meteor';
// import _ from 'underscore@1.0.10';
import { Container, Header, Loader, Card, Image, Button, Icon, Grid } from 'semantic-ui-react';
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

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>User Page</Header>
          <Card.Group>
            <Card centered>
              <Image src={this.props.user[0].image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{this.props.user[0].firstName} {this.props.user[0].lastName}</Card.Header>
                <Card.Meta>Rating: {this.props.user[0].rating}</Card.Meta>
                <Card.Meta>Status: {this.props.user[0].status}</Card.Meta>
                <Card.Meta>Major: {this.props.user[0].dType} - {this.props.user[0].mType} </Card.Meta>
                <Card.Description>
                  Classes Taken:
                  <ul>
                    {this.props.classes.filter(obj => obj.status.includes('Taken')).map(
                        (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>))}
                  </ul>
                </Card.Description>
                <Card.Description>
                  Classes Currently In:
                  <ul>
                    {this.props.classes.filter(obj => obj.status.includes('Currently-Taking')).map(
                        (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                    )}
                  </ul>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid columns='two' divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to="/addClass" key='addClass'>
                        <Icon name='add' />
                        Add Class
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to={`/editUser/${this.props.user[0]._id}`} key='editUser'>
                        <Icon name='edit' />
                        Edit User
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Card.Group>
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
