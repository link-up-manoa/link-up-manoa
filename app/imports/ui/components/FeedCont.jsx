import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class FeedCont extends React.Component {
  render() {
    return (
        <Feed.Event >
          <Feed.Content>
            <Feed.Date content={this.props.feed.date.toLocaleDateString('en-US')} />
            <Feed.Date>{this.props.feed.time}</Feed.Date>
            <Feed.Summary>
              {this.props.feed.place}
              {this.props.feed.topic}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
FeedCont.propTypes = {
  feed: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(FeedCont);
