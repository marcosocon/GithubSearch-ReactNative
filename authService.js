var buffer = require('buffer');
class AuthService {
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
				return cb({successLogin: true, results: results});
			}
		})
		.catch((err) => {
			return cb({err:err, successLogin: false });
		});
	}
}
module.exports = new AuthService();
