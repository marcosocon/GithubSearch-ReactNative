'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  View
} from 'react-native';

const styles = StyleSheet.create({
	stretch: {
		width: 200,
		height: 200
	},
	heading:{
		fontSize:30,
	},
	button:{
		height:50,
		backgroundColor: 'cyan',
		borderRadius:3,
		width: 100,
		marginTop:20,
		justifyContent:'center'
	},
	loading:{
		marginTop:20,
	},
	textButton:{
		color:'white',
		fontSize:17,
		textAlign:'center'
	},
	input:{
		height:50,
		marginTop:10
	}

});

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { showProgress: false };
	}
	render() {
		return (
			<View style={{alignItems: 'center', padding:50}}>
				<Image style={styles.stretch} source={ require('./img/octocat.png') } />
				<Text style={styles.heading}>Github Search</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => this.setState({username: text})}
					placeholder="GitHub Username"/>
				<TextInput
					style={styles.input}
					onChangeText={(text)=> this.setState({password: text})}
					secureTextEntry={true}
					placeholder="GitHub Password"/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.onLoginSubmit.bind(this)}>
					<Text style={styles.textButton}>Log in!</Text>
				</ TouchableHighlight >
				<ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loading}/>
			</View>
		);
	}
	onLoginSubmit(){
		console.log("Attempting login with user " + this.state.username +" and pass "+ this.state.password);
		this.setState({showProgress: true});
	}
}

module.exports = Login;
