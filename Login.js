'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
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
	textButton:{
		color:'white',
		fontSize:17,
		textAlign:'center'
	},
	input:{
		height:50
	}

});

class Login extends Component {
	render() {
		return (
			<View style={{alignItems: 'center', padding:50}}>
				<Image style={styles.stretch} source={require('./img/octocat.png')} />
				<Text style={styles.heading}>Github Search</Text>
				<TextInput style={styles.input} placeholder="GitHub Username"/>
				<TextInput style={styles.input} secureTextEntry="true" placeholder="GitHub Password"/>
				<TouchableHighlight style={styles.button}>
					<Text style={styles.textButton}>Log in!</Text>
				</ TouchableHighlight >
			</View>
		);
	}
}

module.exports = Login;
