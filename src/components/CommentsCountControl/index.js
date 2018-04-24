import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as commentActions from '../../actions/comments';
import { faComments } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import './CommentsCountControl.css';

const propTypes = {
  parentId: PropTypes.string
};

class CommentsCountControl extends Component {

  componentDidMount () {
    const parentId = this.props.parentId;
    this.props.fetchPostComments(parentId)
  }

  commentCount = (comments) => {
    return comments !== undefined ? comments.length : 0;
  }

  render () {
    const { comments, parentId } = this.props;
    const commentCount = this.commentCount( comments[parentId] );
    return (
      <div className="CommentsCountControl input-group">
        <span className="input-group-addon">
          <FontAwesomeIcon iconDefinition={faComments} />
        </span>
        <span className="input-group-addon">
          {commentCount}
        </span>
      </div>
    );
  }
};

CommentsCountControl.propTypes = propTypes;

const mapStateToProps  = ({ comments }, ownProps) => ({
  comments
})

export default connect(mapStateToProps, commentActions)(CommentsCountControl)