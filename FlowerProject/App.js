
import React from 'react';
import SocketIOClient from 'socket.io-client';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { Constants } from 'expo';
import { subscribeToTimer } from './api';
import { addPoints } from './api';
import openSocket from 'socket.io-client';

export default class App extends React.Component {
	constructor(props) {
	  super(props);
	  const ws = new openSocket('ws://192.168.0.21:3000', { //192.168.0.21 is the ipaddr of my computer, so you'd need to find that
		  transports: ['websocket'],
	  });
	  
		this.state = {
			currentName: 'Red',
			points: 0,
			timestamp: (new Date()).toLocaleTimeString(),
			teams: [
				{
					teamname: 'Red',
					teampoints: 0
				},
				{
					teamname: 'Yellow',
					teampoints: 10
				},
				{
					teamname: 'Blue',
					teampoints: 8
				},
				{
					teamname: 'Green',
					teampoints: 0
				}
			]
			
			
		};

	  console.log("This is client side web socket");
	  subscribeToTimer(60000,(err, timestamp) => this.setState({ 
		timestamp
	  }));
	}
	
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>Classification Game</Text>
            <Text style={styles.header}>Room: Abalone</Text>
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
			  <Text>
					This is the timer value: {this.state.timestamp}
			  </Text>
            </Card>
          </Card>
			
          <Card title="Your Points" style={styles.cardStyle}>
			<Text style={styles.paragraph}>
				{this.state.points} pts 
			</Text>
            
            <Card title="Your Submissions" style={styles.cardStyle}>
				<Text style={styles.paragraph}>
				Rose - 2 pts 
				</Text>
				<Text style={styles.paragraph}>
				   Rose - 2 pts 
				</Text>
				<Text style={styles.paragraph}>
				   Rose - 2 pts 
				</Text>
            </Card>
          </Card>
		  
		<Card title="Teams">
			{this.renderTeamBoard()}
		</Card>
			
        </View>
      </ScrollView>
    );
  }
	renderTeamBoard() {
		return this.state.teams.map(function(object, i){
			return (
				<Text key={i} style={styles.paragraph}>{object.teamname}: {object.teampoints} pts</Text>
			);
		});
	}
	
	updateTeamBoard(){
		this.state.teams.map((item) =>{
			if(item.teamname === this.state.currentName){
				item.teampoints = this.state.points;
			}
		});
	}
	_handleButtonTakePicture = () => {
		Alert.alert(
		  'Should take user to the camera to a take a picture to identify so please implement me. ;~;',
		);
		addPoints(this.state.points, 1, (err, points) => {this.setState({
			points
		});
		this.updateTeamBoard();}
		);
		
	};
}

const styles = StyleSheet.create({
   buttonSubmit: {
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
