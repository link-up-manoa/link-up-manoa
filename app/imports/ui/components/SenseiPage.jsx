import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SenseiPage extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.sensei.image} />
            <Card.Header>{this.props.sensei.firstName} {this.props.sensei.lastName}</Card.Header>
            <Card.Meta>{this.props.sensei.classStanding}</Card.Meta>
            <Card.Meta>{this.props.sensei.major}</Card.Meta>
            <Card.Description>
              {this.props.sensei.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              {this.props.sensei.subjects}
            </a>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
SenseiPage.propTypes = {
  sensei: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SenseiPage);
