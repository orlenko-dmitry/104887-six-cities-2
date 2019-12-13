import React, {PureComponent} from 'react';
import {
  oneOf,
  shape,
  string,
  func,
} from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import aData from '../../store/data/actions.js';
import {ASYNC_STATUSES} from '../../consts/index.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = ASYNC_STATUSES;

const withReviewsForm = (Component) => {
  class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: 0,
        comment: ``,
      };
      this._ratingChangeHandler = this._ratingChangeHandler.bind(this);
      this._commentChangeHandler = this._commentChangeHandler.bind(this);
      this._formSubmitHandler = this._formSubmitHandler.bind(this);
      this._clearState = this._clearState.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {messagePostStatus} = this.props;
      if (prevProps.messagePostStatus === PENDING && messagePostStatus === ``) {
        this._clearState();
      }
    }

    _clearState() {
      this.setState({rating: 0, comment: ``});
    }

    _ratingChangeHandler(value) {
      this.setState({rating: value});
    }

    _commentChangeHandler(value) {
      this.setState({comment: value});
    }

    _formSubmitHandler(evt) {
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
          onRatingChange={this._ratingChangeHandler}
          onCommentChange={this._commentChangeHandler}
          onSubmitForm={this._formSubmitHandler}
        />
      );
    }
  }

  WithReviewsForm.propTypes = {
    user: shape({}),
    messagePostStatus: oneOf([``, PENDING, SUCCESS, ERROR]).isRequired,
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
