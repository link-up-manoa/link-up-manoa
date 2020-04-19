import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Reminders } from '../../api/stuff/Reminders';

export default class Reminder extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Reminders.update(this.props.reminder._id, {
      $set: { checked: !this.props.reminder.checked },
    });
  }

  deleteThisReminder() {
    Reminders.remove(this.props.reminder._id);
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const reminderClassName = this.props.reminder.checked ? 'checked' : '';

    return (
        <li className={reminderClassName}>
          <button className="deleteReminder" onClick={this.deleteThisReminder.bind(this)}>
            &times;
          </button>

          <input
              type="checkbox"
              readOnly
              checked={!!this.props.reminder.checked}
              onClick={this.toggleChecked.bind(this)}
          />

          <span className="text">{this.props.reminder.text}</span>
        </li>
    );
  }
}

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired,
};
