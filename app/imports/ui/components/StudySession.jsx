import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudySession extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.session.firstName} {this.props.session.lastName}</Table.Cell>
          <Table.Cell>{this.props.session.date}</Table.Cell>
          <Table.Cell>{this.props.session.location}</Table.Cell>
          <Table.Cell>{this.props.session.subject}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StudySession.propTypes = {
  session: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudySession);
