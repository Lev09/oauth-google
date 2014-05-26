var express = require('express');
var app = express();

var googleapis = require('googleapis');
var OAuth2 = googleapis.auth.OAuth2;

var oauth2Client = new OAuth2(
	'user', 
	'password', 
	'http://127.0.0.1:3000/oauth/google/callback');

app.get('/auth/google', function(req, res) {

	var scopes = ['https://www.googleapis.com/auth/calendar'];

	var url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes.join(" ")
	});

  res.redirect(url);
});

app.get('/oauth/google/callback', function(req, res){

	var code = req.query.code;
	oauth2Client.getToken(code, function(err, tokens) {
		res.send(JSON.stringify({
			err: err,
			tokens: tokens
		}));
	});

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
