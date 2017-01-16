import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  shareBtn: {
    width: 150,
    padding: 15,
  },
});

export default styles;
