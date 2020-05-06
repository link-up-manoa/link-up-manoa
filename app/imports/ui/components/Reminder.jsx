import React, { Component } from 'react';
import { List, Checkbox, Button } from 'semantic-ui-react';
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
    const reminderClassName = this.props.reminder.checked ? 'checked-reminder' : 'unchecked-reminder';

    return (
        <List.Item>
          <Button
              color='red'
              className="deleteReminder"
              onClick={this.deleteThisReminder.bind(this)}
              size='mini'>
            Delete
          </Button>
            <List.Content>
              <List.Header className={reminderClassName}>
                <Checkbox
                    checked={!!this.props.reminder.checked}
                    onChange={this.toggleChecked.bind(this)}
                    className={'reminder-checkbox'}
                />
                {this.props.reminder.text}
              </List.Header>
              <List.Description>date created: {this.props.reminder.dateCreated}</List.Description>
            </List.Content>
        </List.Item>
    );
  }
}

Reminder.propTypes = {
  reminder: PropTypes.object.isRequired,
};
