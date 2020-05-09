import React, { Component } from 'react';
import { Checkbox, List } from 'semantic-ui-react';
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
    // eslint-disable-next-line react/no-string-refs,react/no-find-dom-node
    const reminder = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const today = new Date();
    const date = `${today.getFullYear().toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;


    Reminders.insert({
      text: reminder,
      owner: Meteor.user().username,
      dateCreated: date, // current time
      checked: false,
    });
    console.log(Reminders.find().fetch());
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
    console.log('renderReminders');
    console.log(Reminders.find().fetch());
    return filteredReminders.map((reminder) => (
        <Reminder key={reminder._id} reminder={reminder} />
    ));
  }

  render() {
    return (
        <div className="reminderListContainer">
          <header>
            <h1>Reminders List</h1>
            <Checkbox
                label={'Hide Checked Reminders'}
                onChange={this.toggleHideCompleted.bind(this)}
                checked={this.state.hideCompleted}/>
          </header>
            <form className="new-reminder" onSubmit={this.handleSubmit.bind(this)} >
              <input
                  type="text"
                  /* eslint-disable-next-line react/no-string-refs */
                  ref="textInput"
                  placeholder="Type to add new reminders"
              />
            </form>

          <List divided relaxed>
            {this.renderReminders()}
          </List>
        </div>
    );
  }
}

ReminderList.propTypes = {
  reminders: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const handle = Meteor.subscribe('Reminders');
  return {
    reminders: Reminders.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Reminders.find({ checked: { $ne: true } }).count(),
    ready: handle.ready(),
  };
})(ReminderList);
