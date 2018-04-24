import React, { Component } from 'react';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const SortButtonPropTypes = {
  orderby: PropTypes.string,
  criteria: PropTypes.string,
  sort: PropTypes.oneOf(['asc', 'desc']),
  onClickHandler: PropTypes.func
};

class SortButton extends Component {
  render() {
    const {orderby, sort, criteria, onClickHandler} = this.props;

    return (
      <button type="button"
              className={'btn ' + (orderby === criteria ? 'btn-primary' : 'btn-secondary')}
              onClick={() => {
                onClickHandler(criteria, sort)
              }}
      >
        {orderby === criteria && (
          <FontAwesomeIcon iconDefinition={sort === 'asc' ? faLongArrowAltUp : faLongArrowAltDown} />
        )}
        {criteria}
      </button>
    );
  }
}

SortButton.propTypes = SortButtonPropTypes;

export default SortButton;