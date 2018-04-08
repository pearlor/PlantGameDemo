import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Constants } from 'expo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class GameScreen extends Component {
  constructor(props, context){
	  super(props, context)
	  
	  const { chatHistory } = props 
	  
	  this.state = {
		  chatHistory,
		  input: ''
	  }
		this.onInput = this.onInput.bind(this)
		this.updateChatHistory = this.updateChatHistory.bind(this)
		this.onMessageReceived = this.onMessageReceived.bind(this)
		this.onSendMessage = this.onSendMessage.bind(this)
		this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }
  
  componentDidMount() {
	  this.props.registerHandler(this.onMessageReceived)
	  this.scrollChatToBottom()
  }
  
  componentDidUpdate() {
	this.scrollChatToBottom()
  }

  componentWillUnmount() {
	  this.props.unregisterHandler()
  }
  
  onInput(e) {
	this.setState({
		input: e.target.value
	})
  }
  
  updateChatHistory(entry) {
	  this.setState({ chatHistory: this.state.chatHistory.concat(entry)})
  }
  onMessageReceived(entry) {
	  console.log('onMessageReceived: ', entry)
	  this.updateChatHistory(entry)
  }
  
  onSendMessage(){
	if(!this.state.input)
		return
	
	this.props.onSendMessage(this.state.input, (err) => {
		if(err)
			return console.error(err)
		
		return this.setState({input: ''})
	})
  }
  
  scrollChatToBottom(){
	this.panel.scrollTo(0, this.panel.scrollHeight)
  }
  
  _handleButtonTakePicture = () => {
    Alert.alert(
      'Should take user to the camera to a take a picture to identify so please implement me. ;~;',
    );
  };


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Classification Game</Text>
            <Text style={styles.header}>Room: {this.props.flowerRoom.name}</Text>
          </View>
          <Text style={styles.paragraph}>
            Try to correctly classify as many plants in 10 minutes!
          </Text>
          <Card title="Submit Your Photos">
              <View>
                <TouchableOpacity style={styles.buttonSubmit} onPress={this._handleButtonTakePicture}>
                  <Text style={styles.buttonSubmitText}>Take a Photo</Text>
                </TouchableOpacity>
              </View>
            <Card title="Timer">
              <Text style={styles.paragraph}>
                 4:45 minutes
              </Text>
              <Text style={styles.paragraph}>
                 End Time: 10:00 PM
              </Text>
            </Card>
          </Card>
          <Card title="Your Submissions" style={styles.cardStyle}>
            <Text style={styles.paragraph}>
               Rose - 2 pts 
            </Text>
            <Text style={styles.paragraph}>
               Rose - 2 pts 
            </Text>
            <Text style={styles.paragraph}>
               Rose - pts 
            </Text>
            <Card title="Your Points" style={styles.cardStyle}>
              <Text style={styles.paragraph}>
                 25 pts 
              </Text>
            </Card>
          </Card>
          
          <Card title="Leaderboard">
            <Text style={styles.paragraph}>
                Team Red: 25 pts
            </Text>
            <Text style={styles.paragraph}>
               Team Green: 1 pt
            </Text>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   buttonSubmit: {
    align: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'salmon',
    padding: 10,
    borderRadius: 10,
  },
  buttonSubmitText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardStyle: {
    padding: 500 
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  header:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
