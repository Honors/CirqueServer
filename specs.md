##Get Boards for User

Requests:

```sh
curl -s http://localhost:8080/api/users/189713730/boards
```

Responses:

```ruby
success=true
```

##Get a Board

Requests:

```sh
curl -s http://localhost:8080/api/boards/123
```

Responses:

```ruby
success=true
```

##Get Posts of a Board

Requests:

```sh
curl -s http://localhost:8080/api/boards/123/posts
```

Responses:

```ruby
success=true
```

##Create a Board

Requests:

```sh
curl -s http://localhost:8080/api/boards \
	-d "{
		\"location\": \"32.0,54.0\", \
		\"name\": \"Birthday\", \
		\"private\": false, \
		\"members\": [123, 456] \
	}"
```

Responses:

```ruby
success=true
```

##Create a Post

Requests:

```sh
curl -s http://localhost:8080/api/boards/123/posts \
	-d "{
		\"user\": 123, \
		\"type\": \"text\", \
		\"embeds\": [], \
		\"content\": \"hello, world\" \
	}"
```

Responses:

```ruby
success=true
```

##Get a User's Location

Requests:

```sh
curl -s http://localhost:8080/api/users/189713730/location
```

Responses:

```ruby
success=true
```

##Set a User's Location

Requests:

```sh
curl -s http://localhost:8080/api/users/189713730/location \
	-d "32.0,54.0"
```

Responses:

```ruby
success=true
```

##Locate Users

Requests:

```sh
curl -s http://localhost:8080/api/users/locate \
	-d "32.0,54.0"
```

Responses:

```ruby
success=true
```

##Locate Boards

Requests:

```sh
curl -s http://localhost:8080/api/boards/locate \
	-d "32.0,54.0"
```

Responses:

```ruby
success=true
```

##Invite Users

Requests:

```sh
curl -s http://localhost:8080/api/boards/123/invite \
	-d "{
		\"from\": 123, \
		\"to\": 123, \
		\"message\": \"you should come!\" \
	}"
```

Responses:

```ruby
success=true
```

##Get Invitations

Requests:

```sh
curl -s http://localhost:8080/api/users/189713730/invitations
```

Responses:

```ruby
success=true
```

##Upload an Asset

Requests:

```sh
curl -s http://localhost:8080/api/assets/test.txt \
	-d @test.txt
```

Responses:

```ruby
success=true
```

##Get an Asset

Requests:

```sh
curl -s http://localhost:8080/api/assets/test.txt
```

Responses:

```ruby
success=true
```

