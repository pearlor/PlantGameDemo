
import React from 'react';
import SocketIOClient from 'socket.io-client';
import { StyleSheet, Text, View } from 'react-native';
import { subscribeToTimer } from './api';

export default class App extends React.Component {
constructor(props) {
  super(props);
  subscribeToTimer((err, timestamp) => this.setState({ 
    timestamp 
  }));
}
	  state = {
		timestamp: 'no timestamp yet'
	};
  render() {
    return (
      <View>
		<Text>
			This is the timer value: {this.state.timestamp}
		</Text>
	  </View>
    );
  }
  componentWillMount(){
	return   subscribeToTimer((err, timestamp) => this.setState({ 
    timestamp 
  }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
