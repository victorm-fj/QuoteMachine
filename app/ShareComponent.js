import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

class ShareComponent extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {}}
        style={styles.btn}
      >
        <Text style={styles.text}>
          Share
        </Text>
      </TouchableOpacity>
    );
  }
}

ShareComponent.propTypes = {
  author: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
};

export default ShareComponent;
