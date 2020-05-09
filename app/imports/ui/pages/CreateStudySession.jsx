import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/session/Session';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  username: String,
  date: Date,
  place: String,
  members: String,
  topic: String,
  questions: String,
});

/** Renders the Page for adding a document. */
class CreateStudySession extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { username, date, place, members, topic, questions } = data;
    const owner = Meteor.user().username;
    Sessions.insert({ username, date, place, members, topic, questions, owner },
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
            <Header as="h2" textAlign="center" inverted>Create Study Session</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='username'/>
                <DateField name='date' decimal={false}/>
                <TextField name='place'/>
                <TextField name='members'/>
                <TextField name='topic'/>
                <TextField name='questions'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default CreateStudySession;
