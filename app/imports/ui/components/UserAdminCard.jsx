import { Button, Card, Icon, Image } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserAdminCard extends React.Component {
  render() {
    return (
        <Card.Group>
          <Card centered>
            <Image src={this.props.user.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
              <Card.Meta>Rating: {this.props.user.rating}</Card.Meta>
              <Card.Meta>Status: {this.props.user.status}</Card.Meta>
              <Card.Meta>Major: {this.props.user.dType} - {this.props.user.mType} </Card.Meta>
              <Card.Description>
                Classes Taken:
                <ul>
                  {this.props.classes.filter(obj => obj.status.includes('Taken')).map(
                      (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                  )}
                </ul>
              </Card.Description>
              <Card.Description>
                Classes Currently In:
                <ul>
                  {this.props.classes.filter(obj => obj.status.includes('Currently-Taking')).map(
                      (obj, index) => (<li key={index}>{obj.classAlpha} {obj.classNum}</li>),
                    )}
                </ul>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button red icon labelPosition='left'>
                <Icon name='trash' />
                Delete
              </Button>
            </Card.Content>
          </Card>
        </Card.Group>
    );
  }
}

/** Require a document to be passed to this component. */
UserAdminCard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.array.isRequired,
};

export default UserAdminCard;
