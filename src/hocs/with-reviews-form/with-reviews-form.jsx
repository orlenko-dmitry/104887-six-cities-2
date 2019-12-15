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
import {AsyncStatus} from '../../consts/consts.js';

const {
  PENDING,
  SUCCESS,
  ERROR,
} = AsyncStatus;

const withReviewsForm = (Component) => {
  class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: 0,
        comment: ``,
      };
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleClearState = this._handleClearState.bind(this);
    }

    componentDidUpdate(prevProps) {
      const {messagePostStatus} = this.props;
      if (prevProps.messagePostStatus === PENDING && messagePostStatus === ``) {
        this._handleClearState();
      }
    }

    _handleClearState() {
      this.setState({rating: 0, comment: ``});
    }

    _handleRatingChange(value) {
      this.setState({rating: value});
    }

    _handleCommentChange(value) {
      this.setState({comment: value});
    }

    _handleFormSubmit(evt) {
      const {offerId, handlePostComment} = this.props;
      const {rating, comment} = this.state;

      evt.preventDefault();
      handlePostComment({offerId, rating, comment});
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
          onRatingChange={this._handleRatingChange}
          onCommentChange={this._handleCommentChange}
          onSubmitForm={this._handleFormSubmit}
        />
      );
    }
  }

  WithReviewsForm.propTypes = {
    user: shape({}),
    messagePostStatus: oneOf([``, PENDING, SUCCESS, ERROR]).isRequired,
    offerId: string.isRequired,
    handlePostComment: func.isRequired,
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
  handlepostComment: (payload) => dispatch(aData.postComment(payload)),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withReviewsForm
);
