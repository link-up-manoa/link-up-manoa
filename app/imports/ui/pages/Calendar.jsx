import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Form, DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Calendar extends React.Component {
constructor(props) {
  super(props);

  this.state = {
    date: Date,
    time: '',
    dataTime: '',
    datesRange: '',
  };
}


  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty.call(name, "value")) {
      this.setState({ [name]: value });
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // const { DateInput } = SemanticUiCalendarReact;

    return (
        <Form>
          <DateInput
              name="date"
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              onChange={this.handleChange}
          />
          <TimeInput
              name="time"
              placeholder="Time"
              value={this.state.time}
              iconPosition="left"
              onChange={this.handleChange}
          />
          <DateTimeInput
              name="dateTime"
              placeholder="Date Time"
              value={this.state.dateTime}
              iconPosition="left"
              onChange={this.handleChange}
          />
          <DatesRangeInput
              name="datesRange"
              placeholder="From - To"
              value={this.state.datesRange}
              iconPosition="left"
              onChange={this.handleChange}
          />
        </Form>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Calendar.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Calendar);
