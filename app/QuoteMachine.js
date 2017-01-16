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
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    padding: 15,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  author: {
    fontSize: 20,
    color: '#f8f8f8',
    textAlign: 'right',
    fontStyle: 'italic',
    marginRight: 10,
  },
  quote: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 30,
  },
  btn: {
    width: 150,
    padding: 15,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
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

      // Sometimes fetched data's quoteAuthor is an anynomous one,
      // and then it returns an empty string
      let author;
      if (quoteAuthor === '') {
        author = 'Anonymous';
      } else {
        author = quoteAuthor;
      }

      this.setState({
        quote: quoteText,
        author,
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
        <View style={styles.innerContainer}>
          <Text style={styles.quote}>
            "{quote}"
          </Text>
          <Text style={styles.author}>
            - {author}
          </Text>
        </View>

        {/* when pressed calls this.getQuote method */}
        <TouchableOpacity
          onPress={this.getQuote}
          style={styles.btn}
        >
          <Text style={styles.text}>
            New Quote
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default QuoteMachine;
