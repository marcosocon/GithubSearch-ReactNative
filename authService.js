var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';

class AuthService {
	getAuthInfo(cb){
		AsyncStorage.multiGet([authKey, userKey], (err, val)=>{
			if (err) {
				return cb(err);
			}
			if (!val) {
				return cb();
			}
			var zippedObj = _.zipObject(val);
			if (!zippedObj.authKey) {
				return cb();
			}
			var authInfo = {
				header:{
					Authorization: 'Basic ' + zippedObj.authKey
				},
				user: JSON.parse(zippedObj.userKey)
			};
			return cb(null, authInfo);
		});
	}
	login(creds, cb){
		var base64 = buffer.Buffer(creds.username + ':' + creds.password);
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
				throw 'badCredentials';
			}
		})
		.then((results) => {
			if (results) {
				AsyncStorage.multiSet([
					[authKey, encodedAuth],
					[userKey, JSON.stringify(results)]
				], (err)=>{
					if (err) {
						throw err;
					}
					return cb({successLogin: true, results: results});
				});
			}
		})
		.catch((err) => {
			return cb({err:err, successLogin: false });
		});
	}
}
module.exports = new AuthService();
