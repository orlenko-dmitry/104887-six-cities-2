import React, {PureComponent} from 'react';

const withReviewsForm = (Component) => {
  class WithReviewsForm extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rating: 0,
        message: ``,
      };
      this.ratingChangeHandler = this.ratingChangeHandler.bind(this);
      this.messageChangeHandler = this.messageChangeHandler.bind(this);
      this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    ratingChangeHandler(value) {
      this.setState({rating: value});
    }

    messageChangeHandler(value) {
      this.setState({message: value});
    }

    formSubmitHandler(evt) {
      const {rating, message} = this.state;

      evt.preventDefault();
      console.log(rating, message);
    }

    render() {
      const {message, rating} = this.state;
      return (
        <Component
          {...this.props}
          rating={rating}
          message={message}
          onRatingChange={this.ratingChangeHandler}
          onMessageChange={this.messageChangeHandler}
          onSubmitForm={this.formSubmitHandler}
        />
      );
    }
  }

  return WithReviewsForm;
};

export default withReviewsForm;
