'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

const styles = StyleSheet.create({
  stretch: {
    width: 200,
    height: 200
  }
});

class Login extends Component {
  render() {
    return (
		<View style={{alignItems: 'center', padding:50}}>
			<Image style={styles.stretch} source={require('./img/octocat.png')} />
			<Text>Github Search</Text>
		</View>

    );
  }
}

module.exports = Login;
