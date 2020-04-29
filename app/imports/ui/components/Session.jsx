import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

export class Session extends React.Component {

  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>{this.props.session.topic}</Card.Header>
            <Card.Meta>{this.props.session.date}</Card.Meta>
            <Card.Description>
              {this.props.session.place}
              {this.props.session.members}
            </Card.Description>
            <Card.Content extra>
              <Feed>
                {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
              </Feed>
            </Card.Content>
            <Card.Content extra>
              <AddNote owner={this.props.session.owner} contactId={this.props.session._id}/>
            </Card.Content>
          </Card.Content>
        </Card>
    )
  }
}

Session.propTypes = {
  session: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

export default withRouter(Session);