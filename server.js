var app = require('./route'),
	http = require('http');

var RespObject = function(obj, id, model) {
	for( var k in obj ) {
		this[k] = obj[k];
	}
	this._id = id;
	this._model = model;
};
RespObject.prototype.clean = function() {
	var copy = {};
	for( var k in this ) {
		if( k != '_id' && k != '_model' )
			copy[k] = this[k];
	}
	return copy;
};
var compare = function(a, b) {
	var same = true;
	for( var k in a ) {
		if( a[k] != b[k] ) same = false;
	}
	return same;
};
RespObject.prototype.save = function(cb) {
	this._model[this._id] = this.clean();
	cb(!compare(this._model[this._id].clean(), this.clean()));
};
Array.prototype.find = function(criteria, cb, clean) {
	var model = this;
	var matches = this.filter(function(item) {
		var matches = true;
		for( var k in criteria ) {
			if( criteria[k] instanceof RegExp ) {
				if( !item[k].match(criteria[k]) ) matches = false;
			} else {
				if( item[k] != criteria[k] ) matches = false;
			}
		}
		return matches;
	}).map(function(item, index) {
		return clean?item:(new RespObject(item, index, model));
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

var readPost = function(req, cb) {
	var buffer = [];
	req.on("data", function(chunk) {
		buffer.push(chunk);
	});
	req.on("end", function() {
		cb(buffer.join(""));
	});
};

var readJSON = function(req, cb) {
	readPost(req, function(resp) {
		cb(JSON.parse(resp));
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
}).get({
	path: /^\/api\/users\/[^\/]+\/location/,
	cb: function(req, res) {
		var parts = req.url.substr(1).split('/'),
			user = parts[2];
		users.find({ id: user }, function(err, users) {
			res.end(JSON.stringify({
				success: !err, 
				error: err,
				location: (users[0]||{}).location
			}) + '\n');
		});
	}
}).post({
	path: /^\/api\/users\/[^\/]+\/location/,
	cb: function(req, res) {
		var parts = req.url.substr(1).split('/'),
			user = parts[2];
		readPost(req, function(location) {
			users.find({ id: user }, function(err, users) {
				users[0].location = location;
				users[0].save(function(err) {
					res.end(JSON.stringify({
						success: !err, 
						error: err					
					}) + '\n');
				});
			});
		});
	}
}).post({
	path: /^\/api\/users\/locate/,
	cb: function(req, res) {
		// TODO: calculate nearness better than mere digit truncating.
		readPost(req, function(location) {
			var ll = location.split(','),
				approx = ll.map(function(m){
					var sides=m.split('.');
					return [sides[0], sides[1][0]].join('\\.');
				}).join('[0-9]*?,') + '[0-9]*?',
				matcher = new RegExp(approx);
			users.find({ location: matcher }, function(err, users) {
				console.log(users);
				res.end(JSON.stringify({
					success: !err, 
					error: err,
					users: users
				}) + '\n');
			}, true);
		});
	}
});

http.createServer(app).listen(8080);