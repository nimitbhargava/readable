import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as sortActions from '../../actions/sort';

import './SortControl.css';
import SortButton from '../SortButton';
import SortButtonPropTypes from '../SortButton';

SortButton.propTypes = SortButtonPropTypes;

class SortControl extends Component {

  componentDidMount() {
    this.props.setSort('date', 'asc');
  }

  handleSortClick = (criteria, sort) => {
    this.props.setSort(criteria, sort === 'asc' ? 'desc' : 'asc');
  }

  render () {
    const { sort } = this.props;

    return (
      <div className="SortControl btn-toolbar justify-content-center">
        { sort.orderby && (
          <div className="btn-group">
            <SortButton onClickHandler={this.handleSortClick} orderby={ sort.orderby } sort={sort.sort} criteria="date" />
            <SortButton onClickHandler={this.handleSortClick} orderby={ sort.orderby } sort={sort.sort} criteria="score" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps  = ({ sort }) => ({
  sort
})

export default connect(mapStateToProps, sortActions)(SortControl);