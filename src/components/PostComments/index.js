import React, { Component } from 'react';
import CommentItem from '../CommentItem';

class PostComments extends Component {

  sortCommentsByDate = ( comments ) => {
    if( comments !== undefined ) {
      return comments.sort((a, b) => a.timestamp > b.timestamp);
    } else {
      return comments;
    }
  }

  handleCommentSubmit = ( event ) => {
    event.preventDefault();
    this.props.onNewComment( event );
    this.commentForm.reset();
  }

  render () {

    const { comments } = this.props;

    return (
      <div className="mt-2">
        <div className="card-body">
          <h6 className="card-subtitle">
            {comments.length ? `Comments (${comments.length})` : "No comments!"}
          </h6>
        </div>
        <ul className="list-group">
          { this.sortCommentsByDate(comments).map( comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          ))}
          <li className="list-group-item bg-light">
            <h6 className="mt-2">
              {comments.length ? "Add your comment:" : "You are the first one to commet"}
            </h6>
            <form
              onSubmit={ this.handleCommentSubmit }
              ref={(commentForm) => this.commentForm = commentForm}
            >
              <div className="form-group">
                <input className="form-control" type="text" name="author" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="body"
                  rows="3"
                  placeholder="Your comment"
                  required
                ></textarea>
              </div>
              <button className="card-link btn btn-primary">Add Comment</button>
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

export default PostComments;