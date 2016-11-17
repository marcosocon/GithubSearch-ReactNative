import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	ListView,
	View
} from 'react-native';

import AuthService from './authService';

class Feed extends Component {
	constructor(props) {
		super(props);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		});
		this.state = {
			dataSource: ds.cloneWithRows(['A', 'B', 'C'])
		};
	}
	componentDidMount() {
		this.fetchFeed();
	}
	fetchFeed(){
		AuthService.getAuthInfo((err, authInfo) => {
			var url = 'https://api.github.com/users/' + authInfo.user.login + '/received_events';
			fetch(url, {
				headers: authInfo.header.Authorization
			})
			.then((response)=> response.json())
			.then((responseData)=>{
				this.setState({dataSource: this.state.dataSource.cloneWithRows(responseData)});
			});
		});
	}
	renderRow(rowData){
		return	<Text style={{color: '#333', backgroundColor:'#fff'}}>
					{rowData}
				</Text>
	}
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'flex-start', alignSelf: 'center'}}>
				<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
			</View>
		)
	}
}


module.exports = Feed;
