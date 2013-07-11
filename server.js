var app = require('./route'),
	http = require('http');

Array.prototype.find = function(criteria, cb) {
	var matches = this.filter(function(board) {
		var matches = true;
		for( var k in criteria ) {
			if( board[k] != criteria[k] ) matches = false;
		}
		return matches;
	});
	cb(!matches.length?"No matches.":null, matches);
};

var boards = [{user: 123, id: 123}],
	users = [],
	posts = [];

app.get({
	path: /^/,
	cb: function(req, res) {		
		res.end(JSON.stringify({
			success: false, 
			error: "Not yet implemented."
		}) + '\n');
	}
}).post({
	path: /^/,
	cb: function(req, res) {
		res.end(JSON.stringify({
			success: false, 
			error: "Not yet implemented."
		}) + '\n');
	}
}).get({
	path: /^\/api\/users\/[^\/]+\/boards/,
	cb: function(req, res) {
		var parts = req.url.substr(1).split('/'),
			user = parts[2];
		boards.find({ user: user }, function(err, boards) {
			res.end(JSON.stringify({
				success: !err, 
				error: err,
				boards: boards
			}) + '\n');
		});
	}
}).get({
	path: /^\/api\/boards\/[^\/]+/,
	cb: function(req, res) {
		var parts = req.url.substr(1).split('/'),
			board = parts[2];
		boards.find({ id: board }, function(err, boards) {
			res.end(JSON.stringify({
				success: !err, 
				error: err,
				board: boards[0]
			}) + '\n');
		});
	}
});

http.createServer(app).listen(8080);