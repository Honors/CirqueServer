assert=$1

curl -s http://localhost:8080/api/users/123/boards | $assert "boards for user"

curl -s http://localhost:8080/api/boards/123 | $assert "board access"

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
		\"content\": \"hello, world\", \
	}" | $assert "create post"