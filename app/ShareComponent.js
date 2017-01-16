import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  Share,
} from 'react-native';
import styles from './styles';

class ShareComponent extends Component {
  constructor(props) {
    super(props);
    // Initialize state with 'result'
    this.state = {
      result: '',
    };
  }

  // Callback function triggered when user press Share button
  onPressShare = () => {
    const { author, quote } = this.props;
    Share.share({
      message: `${quote}\n -${author}`,
    })
    .then(this.onShowResult) // Call on Show result
    .catch(this.onShowError); // Call on show error
  }

  // Update 'result' state with messages according to the result of the promise
  onShowResult = (result) => {
    console.log(result);
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({ result: `Shared with: ${result.activityType}` });
      }
    } else if (result.action === Share.dismessedAction) {
      this.setState({ result: 'Dismissed' });
    } else {
      this.setState({ result: 'Shared' });
    }
  }

  // Update 'result' state with an error message in case promise returns an error
  onShowError = (error) => {
    console.log(error);
    this.setState({ result: `Error: ${error.message}` });
  }

  render() {
    console.log(this.state);
    return (
      <TouchableOpacity
        onPress={this.onPressShare}
        style={styles.btn}
      >
        <Text style={styles.text}>
          Share
        </Text>
      </TouchableOpacity>
    );
  }
}

// Required proptypes for this component
ShareComponent.propTypes = {
  author: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

export default ShareComponent;
