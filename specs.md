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

