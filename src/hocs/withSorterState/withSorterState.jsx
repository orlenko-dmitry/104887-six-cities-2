import React, {PureComponent} from 'react';
import {string, func} from 'prop-types';

const withSorterState = (Component) => {
  class WithSorterState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isSorterOpen: false,
      };
      this.openSorterHandler = this.openSorterHandler.bind(this);
    }

    openSorterHandler() {
      const {isSorterOpen} = this.state;
      this.setState({isSorterOpen: !isSorterOpen});
    }

    render() {
      const {isSorterOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isSorterOpen}
          onOpenSorterClick={this.openSorterHandler}
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
