import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Users } from '/imports/api/user/User';
import { Accounts } from 'meteor/accounts-base';
/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const degreeOptions = [
  { key: 'BA', text: 'BA', value: 'BA' },
  { key: 'BS', text: 'BS', value: 'BS' },
  { key: 'MS', text: 'MS', value: 'MS' },
  { key: 'MA', text: 'MA', value: 'MA' },
  { key: 'PhD', text: 'PhD', value: 'PhD' },
];
const statusOptions = [
  { key: 'UG-Student', text: 'Undergraduate Student', value: 'UG-Student' },
  { key: 'G-Student', text: 'Graduate Student', value: 'G-Student' },
];
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '',
      password: '',
      firstName: '',
      lastName: '',
      image: '',
      dType: '',
      mType: '',
      status: '',
      friend: 'friend',
      sensei: false,
      error: '',
      redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, firstName, lastName, image, mType, dType, status } = this.state;
    const owner = email;
    const data = { firstName, lastName, image, rating: 'Grasshopper', status, mType, dType, owner, fType: 'friend',
      sensei: false };
    console.log(data);
    console.log(this.state);
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Users.insert(data,
            (err) => {
              if (err) {
                console.log(err);
                this.setState({ error: err.reason });
              } else {
                this.setState({ error: '', redirectToReferer: true });
              }
            });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  required={true}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required={true}
                  onChange={this.handleChange}
                />
                <Grid columns={2}>
                  <Grid.Column>
                    <Form.Input
                        label="First Name"
                        icon="user"
                        iconPosition="left"
                        name="firstName"
                        placeholder="John"
                        type="firstName"
                        required={true}
                        onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                        label="Last Name"
                        icon="user"
                        iconPosition="left"
                        name="lastName"
                        placeholder="Foo"
                        type="lastName"
                        required={true}
                        onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid>
                <Form.Input
                    label="Profile Picture"
                    icon="user circle"
                    iconPosition="left"
                    name="image"
                    placeholder="Image Link"
                    type=""
                    required={true}
                    onChange={this.handleChange}
                />
                <Grid columns={2}>
                  <Grid.Column>
                    <Form.Select
                        label="Degree Type"
                        name="dType"
                        options={degreeOptions}
                        type="dType"
                        placeholder="BA"
                        required={true}
                        onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                        label="Major"
                        icon="certificate"
                        iconPosition="left"
                        name="mType"
                        placeholder="Major"
                        type="mType"
                        required={true}
                        onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid>
                <Form.Select
                    label="Student Type"
                    name="status"
                    options={statusOptions}
                    type="status"
                    placeholder="Undergraduate Student"
                    required={true}
                    onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
