import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Classes } from '../../api/class/Classes';

const ClassSchema = new SimpleSchema({
  classAlpha: String,
  classNum: Number,
  status: {
    type: String,
    allowedValues: ['Currently-Taking', 'Taken'],
  },
});
/** Renders the Page for adding a document. */
class AddClass extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { classAlpha, classNum, status } = data;
    const owner = Meteor.user().username;
    Classes.insert({ classAlpha, classNum, status, owner },
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
        <Grid container centered >
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Class</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={ClassSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='classAlpha'/>
                <NumField name='classNum' decimal={false}/>
                <SelectField name='status'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddClass;
