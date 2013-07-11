assert=$1

curl -s google.com | $assert "google"

curl -s http://localhost:8080/api/boards/{user_id} | $assert "boards"

curl -s http://localhost:8080/api/boards/{board_id}/posts | $assert "posts"

curl -s http://localhost:8080/api/boards \
	-d "{
		\"location\": \"32.0,54.0\", \
		\"name\": \"Birthday\", \
		\"private\": false, \
		\"members\": [123, 456], \
	}" | $assert "create board"
	
curl -s http://localhost:8080/api/boards/{board_id}/posts \
	-d "{
		\"user\": 123, \
		\"type\": \"text\", \
		\"embeds\": [], \
		\"content\": "hello, world", \
	}" | $assert "create post"