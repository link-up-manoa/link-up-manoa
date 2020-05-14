import React from 'react';
import { Meteor } from 'meteor/meteor';
// import _ from 'underscore@1.0.10';
import {
  Container,
  Header,
  Loader,
  Card,
  Image,
  Icon,
  Table,
  Rating,
  Button,
    Grid
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
          <Header as="h2" textAlign="center" inverted>Available Tutors</Header>
          <Card.Group>
            <Card centered>
              <Image src={this.props.user[0].image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{this.props.user[0].firstName} {this.props.user[0].lastName}</Card.Header>
                <Card.Meta>Rating: {this.props.user[0].rating}</Card.Meta>
                <Card.Meta>Status: {this.props.user[0].status}</Card.Meta>
                <Card.Meta>Major: {this.props.user[0].dType} - {this.props.user[0].mType} </Card.Meta>
                <Card.Description>
                  Tutoring Specialty: ICS 414, ICS 212
                  <ul>
                    {this.props.classes.filter(obj => obj.status.includes('Currently-Taking')).map(
                        (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                    )}
                  </ul>
                  <div className="ui labeled button">
                    <div className="ui red button">
                      <i className="heart icon"></i> Ratings
                    </div>
                    <a className="ui basic red left pointing label">
                      42
                    </a>
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid columns='two' divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to="/addClass" key='addClass'>
                        <Icon name='add' />
                        Request Tutor
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to={`/editUser/${this.props.user[0]._id}`} key='editUser'>
                        <Icon name='address card' />
                        See Profile
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
            <Card centered>
              <Image src={this.props.user[1].image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{this.props.user[1].firstName} {this.props.user[1].lastName}</Card.Header>
                <Card.Meta>Rating: {this.props.user[1].rating}</Card.Meta>
                <Card.Meta>Status: {this.props.user[1].status}</Card.Meta>
                <Card.Meta>Major: {this.props.user[1].dType} - {this.props.user[1].mType} </Card.Meta>
                <Card.Description>
                  Tutoring Specialty: ICS 141, ICS 241
                  <ul>
                    {this.props.classes.filter(obj => obj.status.includes('Currently-Taking')).map(
                        (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                    )}
                  </ul>
                  <div className="ui labeled button">
                    <div className="ui red button">
                      <i className="heart icon"></i> Ratings
                    </div>
                    <a className="ui basic red left pointing label">
                      29
                    </a>
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid columns='two' divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to="/addClass" key='addClass'>
                        <Icon name='add' />
                        Request Tutor
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to={`/editUser/${this.props.user[0]._id}`} key='editUser'>
                        <Icon name='address card' />
                        See Profile
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
            <Card centered>
              <Image src={this.props.user[2].image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{this.props.user[2].firstName} {this.props.user[2].lastName}</Card.Header>
                <Card.Meta>Rating: {this.props.user[2].rating}</Card.Meta>
                <Card.Meta>Status: {this.props.user[2].status}</Card.Meta>
                <Card.Meta>Major: {this.props.user[2].dType} - {this.props.user[2].mType} </Card.Meta>
                <Card.Description>
                  Tutoring Specialty: ICS 111, ICS 211
                  <ul>
                    {this.props.classes.filter(obj => obj.status.includes('Currently-Taking')).map(
                        (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                    )}
                  </ul>
                  <div className="ui labeled button">
                    <div className="ui red button">
                      <i className="heart icon"></i> Ratings
                    </div>
                    <a className="ui basic red left pointing label">
                      75
                    </a>
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid columns='two' divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to="/addClass" key='addClass'>
                        <Icon name='add' />
                        Request Tutor
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to={`/editUser/${this.props.user[0]._id}`} key='editUser'>
                        <Icon name='address card' />
                        See Profile
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
            <Card centered>
              <Image src={this.props.user[0].image} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Basil Barb</Card.Header>
                <Card.Meta>Rating: {this.props.user[0].rating}</Card.Meta>
                <Card.Meta>Status: {this.props.user[0].status}</Card.Meta>
                <Card.Meta>Major: {this.props.user[0].dType} - {this.props.user[0].mType} </Card.Meta>
                <Card.Description>
                  Tutoring Specialty: ICS 311, ICS 314
                  <ul>
                    {this.props.classes.filter(obj => obj.status.includes('Currently-Taking')).map(
                        (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                    )}
                  </ul>
                  <div className="ui labeled button">
                    <div className="ui red button">
                      <i className="heart icon"></i> Ratings
                    </div>
                    <a className="ui basic red left pointing label">
                      23
                    </a>
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid columns='two' divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to="/addClass" key='addClass'>
                        <Icon name='add' />
                        Request Tutor
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon labelPosition='left' as={NavLink} activeClassName="active"
                              exact to={`/editUser/${this.props.user[0]._id}`} key='editUser'>
                        <Icon name='address card' />
                        See Profile
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
