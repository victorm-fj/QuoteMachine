import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import axios from 'axios';

import styles from './styles';
import ShareComponent from './ShareComponent';

// Custom animation
const animate = {
  duration: 500,
  create: {
    duration: 1000,
    delay: 300,
    type: LayoutAnimation.Types.easeIn,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    duration: 200,
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

// Quotes API endpoint, with list of required parameters
let URL = 'http://api.forismatic.com/api/1.0/';
const METHOD = 'getQuote';
const KEY = 457653;
const FORMAT = 'json';
const LANG = 'en';

class QuoteMachine extends Component {
  constructor(props) {
    super(props);
    // In order to get LayoutAnimation work on Android we need to set the
    // following flags
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

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

  componentWillUpdate() {
    // Before every component update custom animation will trigger
    LayoutAnimation.configureNext(animate);
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

  // Generate random color
  randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    console.log(r, g, b);
    const rgb = `rgb(${r}, ${g}, ${b})`;

    return rgb;
  }

  render() {
    const { quote, author } = this.state;
    // Call randomColor function everytime component renders, that is
    // when state changes
    const rgbColor = this.randomColor();

    return (
      <View style={[styles.container, { backgroundColor: rgbColor }]}>
        {/* ^Change backgroundColor according to generated random Color, and merge styles^ */}

        {/* render fetched data */}
        <View style={styles.innerContainer}>
          <Text style={styles.quote}>
            "{quote}"
          </Text>
          <Text style={styles.author}>
            - {author}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <ShareComponent
            author={author}
            quote={quote}
          />

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
      </View>
    );
  }
}

export default QuoteMachine;
