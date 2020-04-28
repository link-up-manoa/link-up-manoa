import React from 'react';
import {  } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import FeedCont from './FeedCont';
import AddFeed from './AddFeed';
import { Sessions } from '../../api/session/Session';

export class ToDo extends React.Component {
  render() {
    return (
      <AddFeed owner={this.props.feed.username}/>
    );
  }

}

ToDo.propTypes = {
  feed: PropTypes.object.isRequired,
};
