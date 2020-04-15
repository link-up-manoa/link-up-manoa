import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

/** The FriendsNavBar appears at the top of every page. Rendered by the App Layout component. */
class FriendsNavBar extends React.Component {
  render() {
    const menuStyle = {
      marginBottom: '10px',
      backgroundColor: '#02784D',
    };
    return (
        <Menu style={menuStyle} borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item as={NavLink} activeClassName="active" exact to="/fri" key='fri'>Friends</Menu.Item>,
                // eslint-disable-next-line max-len
                <Menu.Item as={NavLink} activeClassName="active" exact to="/pend" key='pend'>Pending</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/req" key='req'>Requests</Menu.Item>]
          ) : ''}
          {/* {Roles.userIsInRole(Meteor.userId(), 'admin') ? ( */}
          {/*    <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item> */}
          {/* ) : ''} */}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
FriendsNavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const FriendsNavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(FriendsNavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(FriendsNavBarContainer);
