import React, { Component } from 'react';
import { View, Text } from 'react-native';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
             <View style={{marginTop: 50}}>
                 <Text>React Native with SendBird</Text>
             </View>
        )
    }
}

export default App;