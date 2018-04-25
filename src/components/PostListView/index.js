import React, { Component } from 'react';
import { connect } from 'react-redux';

import SortControl from '../SortControl';
import PostItem from '../PostItem';

import { selectCategory } from '../../actions/categories';
import { fetchPosts } from '../../actions/posts';
import { Link } from 'react-router-dom';

class PostListView extends Component {

  componentDidMount() {
    const filter = this.props.match.params.category || false;
    this.props.fetchPosts(filter);
  }

  componentWillReceiveProps(nextProps) {
    if( nextProps.match.params.category !== this.props.match.params.category ) {
      const filter = nextProps.match.params.category || false;
      this.props.fetchPosts(filter);
    }
  }

  sortPosts = (posts, sort) => {
    if (posts !== undefined) {
      switch (sort.orderby) {
        case 'date':
          return sort.sort === 'asc' ?
            posts.sort((a, b) => a.timestamp > b.timestamp) :
            posts.sort((a, b) => a.timestamp < b.timestamp)
        case 'score':
          return sort.sort === 'asc' ?
            posts.sort((a, b) => a.voteScore > b.voteScore) :
            posts.sort((a, b) => a.voteScore < b.voteScore)
        default:
          return posts
      }
    }
    return posts;
  }

  render () {

    const { posts } = this.props.posts;
    const { sort } = this.props;

    const sortedPosts = this.sortPosts( posts, sort );

    return (
      <div className="container">
        <SortControl />
        {sortedPosts !== undefined && sortedPosts.length ? sortedPosts.map( post => (
          <PostItem
            key={post.id}
            post={post}
          />
        )):(
          <div className="card bg-light">
            <div className="card-body text-center">
              No posts in <strong>{this.props.match.params.category}</strong>.
              Want to add a <Link to={'/new'}>new post</Link>?
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps  = ({ posts, sort }) => ({
  posts, sort
})

export default connect(mapStateToProps, { fetchPosts, selectCategory })(PostListView)