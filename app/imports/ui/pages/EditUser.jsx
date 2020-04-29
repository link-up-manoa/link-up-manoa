import React from 'react';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import { Users } from '../../api/user/User';

const UserSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  status: {
    type: String,
    allowedValues: ['UG-Student', 'G-Student', 'Advisor'],
    defaultValue: 'UG-Student',
  },
  dType: {
    type: String,
    allowedValues: ['BA', 'BS', 'MA', 'MS', 'PhD'],
    defaultValue: 'BS',
  },
  mType: String,
  image: String,
});
/** Renders the Page for adding a document. */
class EditUser extends React.Component {

  submit(data) {
    const { firstName, lastName, status, dType, mType, image, _id } = data;
    Users.update(_id, { $set: { firstName, lastName, status, dType, mType, image } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit User</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={UserSchema} onSubmit={data => this.submit(data, fRef)}
                      model={this.props.doc} >
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <SelectField name='status'/>
                <SelectField name='dType'/>
                <TextField name='mType'/>
                <TextField name='image'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/* Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditUser.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('User');
  return {
    doc: Users.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditUser);
