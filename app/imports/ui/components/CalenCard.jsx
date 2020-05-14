import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import AddNote from './AddNote':
import Note from './Note';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudySession extends React.Component {

  constructor() {
    super();
    this.state = {
      example: false };
  }

  changeState = () => {
    const example = this.state.example;
    this.setState({ example: !example });
  }

  renderElement() {
    if (this.props.session.owner === Meteor.user().username) {
      return <Link to={`/edit/${this.props.session._id}`}>Edit</Link>;
    }
    return <Link to={`/attend/${this.props.session._id}`}>Attend</Link>;
  }

  render() {
    return (
        /* Eventually change src of image to this.props.profile.image in curly braces */
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.session.topic}
            </Card.Header>
            <Card.Meta>
               {this.props.session.date}
            </Card.Meta>
            <Card.Meta>
              Location: {this.props.session.place}
            </Card.Meta>
            <Card.Description>
              Members: {this.props.session.members}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.renderElement()}
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
          <Card.Content extra>
            <AddNote/>
          </Card.Content>
        </Card>
    );
  }
}


/** Require a document to be passed to this component. */
StudySession.propTypes = {
  session: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);
