import React, {PureComponent} from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import aData from '../../store/data/actions.js';

const withReviewsForm = (Component) => {
  class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: 0,
        comment: ``,
      };
      this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
      this.commentChangeHandler = this.commentChangeHandler.bind(this);
      this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    ratingChangeHandler(value) {
      this.setState({rating: value});
    }

    commentChangeHandler(value) {
      this.setState({comment: value});
    }

    formSubmitHandler(evt) {
      const {postCommentHandler} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();
      postCommentHandler({offerId: 3, rating, comment});
    }

    render() {
      const {comment, rating} = this.state;
      return (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          onRatingChange={this.ratingChangeHandler}
          onCommentChange={this.commentChangeHandler}
          onSubmitForm={this.formSubmitHandler}
        />
      );
    }
  }

  WithReviewsForm.propTypes = {
    postCommentHandler: func.isRequired,
  };

  return WithReviewsForm;
};

const mapDispatchToProps = (dispatch) => ({
  postCommentHandler: (payload) => dispatch(aData.postComment(payload)),
});

export default compose(
    connect(null, mapDispatchToProps),
    withReviewsForm
);
