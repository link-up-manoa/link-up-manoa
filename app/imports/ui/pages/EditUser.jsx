import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Classes } from '../../api/class/Classes';

const ClassSchema = new SimpleSchema({
  name: String,
  major: String,
  picture: String,
});
/** Renders the Page for adding a document. */
class EditUser extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, major, picture } = data;
    const owner = Meteor.user().username;
    Classes.insert({ name, major, picture, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit User</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={ClassSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <TextField name='major'/>
                <TextField name='picture'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default EditUser;
