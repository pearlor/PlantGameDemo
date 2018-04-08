
import React from 'react';
import SocketIOClient from 'socket.io-client';
import { StyleSheet, Text, View } from 'react-native';
import { subscribeToTimer } from './api';
import openSocket from 'socket.io-client';

export default class App extends React.Component {
constructor(props) {
  super(props);
  const ws = new openSocket('ws://192.168.0.21:3000', { //192.168.0.21 is the ipaddr of my computer, so you'd need to find that
	  transports: ['websocket'],
  });
  
  this.state = {timestamp: 'no time timestamp for now'};

  console.log("This is client side web socket");
  subscribeToTimer((err, timestamp) => this.setState({ 
    timestamp
  }));
}
	
  render() {
    return (
      <View>
		<Text>
			This is the timer value: {this.state.timestamp}
		</Text>
	  </View>
    );
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
