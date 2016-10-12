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
var buffer = require('buffer');

const styles = StyleSheet.create({
	stretch: {
		width: 200,
		height: 200
	},
	heading:{
		fontSize:30
	},
	error:{
		color:'red',
		marginTop:20
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
		marginTop:20
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
		var errorCtrl = <Text></Text>;
		if (this.state.err === 'badCredentials') {
			errorCtrl = <Text style={styles.error}>Incorrect username or password</Text>;
		}
		if (this.state.err === 'unexpectedError') {
			errorCtrl = <Text style={styles.error}>Login Failed, unknown error</Text>
		}

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
				{errorCtrl}
				<ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loading}/>
			</View>
		);
	}
	onLoginSubmit(){
		this.setState({showProgress: true});
		var base64 = buffer.Buffer(this.state.username + ':' + this.state.password);
		var encodedAuth = base64.toString('base64');

		fetch('https://api.github.com/user', {
			headers:{
				'Authorization': 'Basic ' + encodedAuth
			}
		})
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			}
			if (response.status == 401) {
				throw 'badCredentials'
			}
			if (response.status =! 401) {
				throw 'unexpectedError'
			}
		})
		.then((results) => {
			console.log(results);
			this.setState({successLogin: true});
		})
		.catch((err) => {
			this.setState({err});
		})
		.finally(() => {
			this.setState({showProgress: false});
		})
	}
}

module.exports = Login;
