import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/session/Session';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  username: String,
  time: Number,
  date: Date,
  place: String,
  topic: String,
});

/** Renders the Page for adding a document. */
class AddFeed extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { username, time, date, place, topic } = data;
    Sessions.insert({ username, time, date, place, topic },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Session added successfully to Calendar', 'success');
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
            <Header as="h2" textAlign="center">To-Do:</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <NumField label="Time" name='time' decimal={false}/>
                <NumField label="Date" name='date' decimal={false}/>
                <TextField label="Place:" name='place'/>
                <TextField label="Topic:" name='topic'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddFeed.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddFeed;
