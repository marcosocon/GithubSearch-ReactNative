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
	success:{
		color:'green',
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
		if (this.state.err === 'badCredentials' && !this.state.successLogin === true) {
			errorCtrl = <Text style={styles.error}>Incorrect username or password</Text>;
		}
		if (this.state.successLogin === true) {
			errorCtrl = <Text style={styles.success}>Login Succeded</Text>
		}

		return (
			<View style={{alignItems: 'center', padding:50}}>
				<Image style={styles.stretch} source={ require('./img/octocat.png') } />
				<Text style={styles.heading}>Github Search</Text>
				<TextInput
					style={styles.input}
					autoCapitalize="none"
					autoCorrect={false}
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
		this.setState({showProgress: true, results:null});
		var AuthService = require('./authService');
		AuthService.login({ username: this.state.username,
							password: this.state.password},
							(results) => {
								this.setState(Object.assign({showProgress: false}, results))
								if (this.state.successLogin && this.props.onLogin) {
									this.props.onLogin();
								}
							});

	}
}

module.exports = Login;
