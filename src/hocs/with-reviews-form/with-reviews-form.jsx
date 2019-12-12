import React, {PureComponent} from 'react';
import {
  shape,
  string,
  func,
} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import aData from '../../store/data/actions.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

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
      this.clearState = this.clearState.bind(this);
    }

    componentDidUpdate() {
      if (this.props.messagePostStatus === ASYNC_STATUSES.SUCCESS) {
        this.clearState();
      }
    }

    clearState() {
      this.setState({rating: 0, comment: ``});
    }

    ratingChangeHandler(value) {
      this.setState({rating: value});
    }

    commentChangeHandler(value) {
      this.setState({comment: value});
    }

    formSubmitHandler(evt) {
      const {offerId, postCommentHandler} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();
      postCommentHandler({offerId, rating, comment});
    }

    render() {
      const {user, messagePostStatus} = this.props;
      const {comment, rating} = this.state;

      return user && (
        <Component
          {...this.props}
          rating={rating}
          comment={comment}
          messagePostStatus={messagePostStatus}
          onRatingChange={this.ratingChangeHandler}
          onCommentChange={this.commentChangeHandler}
          onSubmitForm={this.formSubmitHandler}
        />
      );
    }
  }

  WithReviewsForm.propTypes = {
    user: shape({}),
    messagePostStatus: string.isRequired,
    offerId: string.isRequired,
    postCommentHandler: func.isRequired,
  };

  WithReviewsForm.defaultProps = {
    user: null,
  };

  return WithReviewsForm;
};

const mapStateToProps = ({rData, rUser}) => ({
  user: rUser.user,
  messagePostStatus: rData.messagePostStatus,
});

const mapDispatchToProps = (dispatch) => ({
  postCommentHandler: (payload) => dispatch(aData.postComment(payload)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReviewsForm
);
