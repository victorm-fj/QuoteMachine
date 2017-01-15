import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
  // Method that performs a GET request to API end point
  // for now, it only logs the response to the console
  getQuote() {
    console.log('getQuote');
    URL += `?method=${METHOD}`;
    URL += `&key=${KEY}`;
    URL += `&format=${FORMAT}`;
    URL += `&lang=${LANG}`;
    axios.get(URL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Quote Machine App Generator
        </Text>
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
