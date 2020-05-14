import React from 'react';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField, HiddenField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Sessions, SessionSchema } from '../../api/session/Session';
import { Users } from '../../api/user/User';


/** Create a schema to specify the structure of the data to appear in the form. */


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
            <AutoForm ref={ref => { fRef = ref; }} schema={SessionSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='firstName'/>
                <TextField name='lastName'/>
                <DateField name='date' decimal={false}/>
                <TextField name='location'/>
                <TextField name='topic'/>
                <SelectField name='subject'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default CreateStudySession;
