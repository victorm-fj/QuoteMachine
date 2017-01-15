import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

// Quotes API endpoint, with list of required parameters
let URL = 'http://api.forismatic.com/api/1.0/';
const METHOD = 'getQuote';
const KEY = 457653;
const FORMAT = 'json';
const LANG = 'en';

class QuoteMachine extends Component {
  constructor(props) {
    super(props);
    // Initialize state with quote and author empty string properties
    this.state = {
      quote: '',
      author: '',
    };
  }

  componentDidMount() {
    // Perform a GET request to fetch random quote when component has mounted
    this.getQuote();
  }

  // Method that performs a GET request to API end point
  // and on success sets new state with fetched data,
  // on error alerts the user that there's was an error generating quote
  getQuote = () => {
    console.log('getQuote');
    URL += `?method=${METHOD}`;
    URL += `&key=${KEY}`;
    URL += `&format=${FORMAT}`;
    URL += `&lang=${LANG}`;
    axios.get(URL)
    .then((response) => {
      console.log(response);
      const { quoteAuthor, quoteText } = response.data;

      this.setState({
        quote: quoteText,
        author: quoteAuthor,
      });
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Error', 'Something went wrong, try again later');
    });
  }

  render() {
    const { quote, author } = this.state;

    return (
      <View style={styles.container}>
        {/* render fetched data */}
        <Text style={styles.text}>
          "{quote}"
        </Text>
        <Text style={styles.text}>
          - {author}
        </Text>

        {/* when pressed calls this.getQuote method */}
        <TouchableOpacity onPress={this.getQuote}>
          <Text style={styles.text}>
            New Quote
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default QuoteMachine;
