import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	TabBarIOS,
	StyleSheet,
	View
} from 'react-native';

import Feed from './Feed';


class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {selectedTab: 'feed'};
	}
	render() {
		return (
			<TabBarIOS style={styles.container}>
				<TabBarIOS.Item title="Feed" selected={this.state.selectedTab === 'feed'} icon={require('./img/feed.png')} onPress={() => {this.setState({selectedTab: 'feed'})}}>
					<Feed />
				</TabBarIOS.Item>
				<TabBarIOS.Item title="Search" selected={this.state.selectedTab === 'search'} icon={require('./img/search.png')} onPress={() => {this.setState({selectedTab: 'search'})}}>
					<Text style={styles.welcome}>Tab 2</Text>
				</TabBarIOS.Item>
			</TabBarIOS>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 17,
		justifyContent: 'center',
		textAlign: 'center',
		margin: 10,
	}
});

module.exports = AppContainer;
