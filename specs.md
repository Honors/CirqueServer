##Get Boards for User

`curl -s http://localhost:8080/api/users/189713730/boards`

success=true

##Get a Board

`curl -s http://localhost:8080/api/boards/123`

success=true

##Get Posts of a Board

`curl -s http://localhost:8080/api/boards/123/posts`

success=true

##Create a Board

`curl -s http://localhost:8080/api/boards \
	-d "{
		\"location\": \"32.0,54.0\", \
		\"name\": \"Birthday\", \
		\"private\": false, \
		\"members\": [123, 456] \
	}"`

success=true

##Set a User's Location

`curl -s http://localhost:8080/api/users/189713730/location \
	-d "32.0,54.0"`

success=true

##Upload an Asset

`curl -s http://localhost:8080/api/assets/test.txt \
	-d @test.txt`

success=true

