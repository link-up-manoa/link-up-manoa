import React from 'react';
import { Meteor } from 'meteor/meteor';
// import _ from 'underscore@1.0.10';
import {
  Container,
  Header,
  Loader,
  Card,
  Image,
  Button,
  Icon,
  Grid,
  Reveal,
  Table,
  Rating,
  Segment,
  Divider
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Users } from '../../api/user/User';
import { Classes } from '../../api/class/Classes';
import { History } from '../../api/history/History';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class LevelUp extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Level Up</Header>
          <Card.Group>
            <Card centered color = 'red'>
              <Reveal animated = 'move'>
                <Reveal.Content visible>
                  /** Change to a different image. */
              <Image src={this.props.user[0].image} wrapped ui={false} />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <div>
                    <h1>Grasshopper</h1>
                    <h2>What is a grasshopper?</h2>
                    <body>The grasshopper is just starting out on their journey as a student. In order
                    to move on to the next level, participate in at least 2 study sessions, achieve
                    one user rating of 5 starts, and take 100 level classes.</body>
                  </div>
                </Reveal.Content>
            </Reveal>
              <Card.Content>
                <Card.Header>Grasshopper</Card.Header>
              </Card.Content>
              <Card.Content center>
                <Grid columns='one'>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' >
                        <Icon name='arrow up' />
                        Level Up
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Card.Group>
          <Card.Group>
            <Card centered color = 'blue'>
              <Reveal animated = 'move'>
                <Reveal.Content visible>
                  <Image src={this.props.user[0].image} wrapped ui={false} />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <div>
                    <h1>Sensei</h1>
                    <h2>What is a sensei?</h2>
                    <body>The sensei has participated in a total of at least 10 study sessions, achieved 5 positive user
                    ratings, and has taken courses up to the 400 level.</body>
                  </div>
                </Reveal.Content>
              </Reveal>
              <Card.Content center>
                <Card.Header>Sensei</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Grid columns='one'>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' >
                        <Icon name='arrow up' />
                        Level Up
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          </Card.Group>
<Divider horizontal inverted>Rate Your Study Buddies</Divider>
          <Table celled padded>
            <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>User</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Study Again</Table.HeaderCell>
              <Table.HeaderCell>Comments</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Image src={this.props.history[0].image} wrapped ui={false} />
                </Table.Cell>
                <Table.Cell single line>{this.props.history[0].firstName} {this.props.history[0].lastName}</Table.Cell>
                <Table.Cell>
                  <Rating icon='star' defaultRating={3} maxRating={5} />
                </Table.Cell>
                <Table.Cell>
                  <Rating icon='heart' defaultRating={3} maxRating={5} />
                </Table.Cell>
                <Table.Cell>
                  Insert the comments left by the user, if any.
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
LevelUp.propTypes = {
  user: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  const subscription2 = Meteor.subscribe('Classes');
  const subscription3 = Meteor.subscribe('History');
  return {
    user: Users.find({}).fetch(),
    classes: Classes.find({}).fetch(),
    history: History.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready,
  };
})(LevelUp);
