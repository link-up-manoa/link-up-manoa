import React from 'react';
import { Card, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

export class Study extends React.Component {

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.sessions.topic}</Card.Header>
            <Card.Meta>{this.props.sessions.date}</Card.Meta>
            <Card.Description>
              Location: {this.props.sessions.place}
              <br/>
              Members: {this.props.sessions.members}
            </Card.Description>
          </Card.Content>
            <Card.Content extra>
              <Feed>
                {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
              </Feed>
            </Card.Content>
            <Card.Content extra>
              <AddNote owner={this.props.sessions.owner} contactId={this.props.sessions._id}/>
            </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Study.propTypes = {
  sessions: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

export default withRouter(Study);
