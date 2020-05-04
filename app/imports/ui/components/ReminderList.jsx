import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Reminders } from '../../api/stuff/Reminders';
import Reminder from './Reminder.jsx';

// App component - represents the whole app
class ReminderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Reminders.insert({
      text,
      owner: Meteor.user().username,
      dateCreated: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderReminders() {
    let filteredReminders = this.props.reminders;
    if (this.state.hideCompleted) {
      filteredReminders = filteredReminders.filter(reminder => !reminder.checked);
    }
    return filteredReminders.map((reminder) => (
        <Reminder key={reminder._id} reminder={reminder} />
    ));
  }

  render() {
    return (
        <div className="reminderListContainer">
          <header>
            <h1>Reminders List</h1>

            <label className="hide-completed">
              <input
                  type="checkbox"
                  readOnly
                  checked={this.state.hideCompleted}
                  onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Reminders
            </label>

            <form className="new-reminder" onSubmit={this.handleSubmit.bind(this)} >
              <input
                  type="text"
                  /* eslint-disable-next-line react/no-string-refs */
                  ref="textInput"
                  placeholder="Type to add new reminders"
              />
            </form>

          </header>

          <ul>
            {this.renderReminders()}
          </ul>
        </div>
    );
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.array.isRequired,
};

export default withTracker(() => ({
    reminders: Reminders.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Reminders.find({ checked: { $ne: true } }).count(),
  }))(ReminderList);
