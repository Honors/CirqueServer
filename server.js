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
Array.prototype.insert = function(obj, cb) {
	this.push(obj);
	cb(this.indexOf(obj) == -1);
};

var boards = [{ user: 123, id: 123, location: "32.0,54.0" }],
	users = [{ id: 123, name: "matt3141", location: "32.0,54.0" }],
	posts = [{ id: 123, user: 123, board: 123 }];

var readJSON = function(req, cb) {
	var buffer = [];
	req.on("data", function(chunk) {
		buffer.push(chunk);
	});
	req.on("end", function() {
		cb(JSON.parse(buffer.join("")));
	});
};

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
}).get({
	path: /^\/api\/boards\/[^\/]+\/posts/,
	cb: function(req, res) {
		var parts = req.url.substr(1).split('/'),
			board = parts[2];
		posts.find({ board: board }, function(err, posts) {
			res.end(JSON.stringify({
				success: !err, 
				error: err,
				posts: posts[0]
			}) + '\n');
		});
	}
}).post({
	path: /^\/api\/boards/,
	cb: function(req, res) {
		readJSON(req, function(board) {
			boards.insert(board, function(err) {
				res.end(JSON.stringify({
					success: !err, 
					error: err
				}) + '\n');
			});
		});
	}
}).post({
	path: /^\/api\/boards\/[^\/]+\/posts/,
	cb: function(req, res) {
		var parts = req.url.substr(1).split('/'),
			board = parts[2];
		readJSON(req, function(post) {
			post.board = board;
			posts.insert(post, function(err) {
				res.end(JSON.stringify({
					success: !err, 
					error: err
				}) + '\n');
			});
		});
	}
});

http.createServer(app).listen(8080);