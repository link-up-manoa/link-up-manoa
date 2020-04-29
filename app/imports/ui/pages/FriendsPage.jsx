import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom'
import { Table, Header, Loader, Grid, Icon, Menu, Input, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Friends } from '../../api/stuff/Friends';
import { FriendComp } from '../components/FriendComp';

/** Renders a table containing all of the friends documents. */
class FriendsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
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
              <Menu pointing>
                <Menu.Item as={NavLink} activeClassName="" exact to="/"/>
                <Menu.Item as={NavLink} activeClassName="active" exact to="/friends/fri" key='fri'>Friends</Menu.Item>
                <Menu.Item as={NavLink} activeClassName="active" exact to="/friends/pend" key='pend'>Pending</Menu.Item>
                <Menu.Item as={NavLink} activeClassName="active" exact to="/friends/req" key='req'>Requests</Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Input
                  action={{
                    color: 'grey',
                    icon: 'plus',
                  }}
                  placeholder='Type Username..'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
FriendsPage.propTypes = {
  friends: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Friends');
  return {
    friends: Friends.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FriendsPage);