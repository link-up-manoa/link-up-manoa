import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Header, Tab, Grid, Icon, Form, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import FriendView from './FriendView';
import Request from './Request';

/** Renders a table containing all of the friends documents. */
class FriendsPage extends React.Component {

  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => this.setState({ name: '' })

  panes = [
    {
      menuItem: 'View Friends',
      render: () => <Tab.Pane attached={false}><FriendView/></Tab.Pane>,
    },
    {
      menuItem: 'Requests',
      render: () => <Tab.Pane attached={false}><Request/></Tab.Pane>,
    },
  ];

// eslint-disable-next-line max-len
/** create local variables that tells who are these friends , how to calculate and retrieve who are the friends, pending, and requeting friends
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
  const { name } = this.state;

    return (
        <Grid container celled='internally'>
          <Header as="h2" textAlign="center">Your Friends</Header>
          <Grid.Row>
            <Grid.Column width={5}>
          <Table fixed basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Recommendations:</Table.HeaderCell>
                <Table.HeaderCell>Add</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Delilah Hills
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                      <Icon name="plus"/>
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Sarah Manning
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                      <Icon name="plus"/>
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Travis Lane
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                      <Icon name="plus"/>
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  Calli Dunn
                </Table.Cell>
                <Table.Cell>
                  <Button animated>
                    <Button.Content hidden>Add</Button.Content>
                    <Button.Content visible>
                      <Icon name="plus"/>
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
            </Grid.Column>

            <Grid.Column width={11}>
              <Tab menu={{ pointing: true }} panes={this.panes} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>
                  <label>Email or Username:</label>
                  <Form.Input
                      placeholder='Type name...'
                      name='name'
                      value={name}
                      onChange={this.handleChange}/>
                </Form.Field>
                <Button type='submit'>Add</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
FriendsPage.propTypes = {
  user: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  return {
    user: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FriendsPage);
