import React, {PureComponent} from 'react';
import {string, func} from 'prop-types';

const withSorterState = (Component) => {
  class WithSorterState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isSorterOpen: false,
      };
      this._openSorterHandler = this._openSorterHandler.bind(this);
    }

    _openSorterHandler() {
      const {isSorterOpen} = this.state;
      this.setState({isSorterOpen: !isSorterOpen});
    }

    render() {
      const {isSorterOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isSorterOpen}
          onOpenSorterClick={this._openSorterHandler}
        />
      );
    }
  }
  return WithSorterState;
};

withSorterState.propTypes = {
  sortedBy: string.isRequired,
  onSortByClick: func.isRequired,
};

export default withSorterState;
