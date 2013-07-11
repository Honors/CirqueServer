##Get Token
1. TODO: An authorization mechanism.

##Get Boards for User

```sh
	curl http://localhost:8080/api/users/{user_id}/boards
```

##Get a Given Board

```sh
curl http://localhost:8080/api/boards/{board_id}
```

##Get Posts

```sh
curl http://localhost:8080/api/boards/{board_id}/posts
```

##Create Board

```sh
curl http://localhost:8080/api/boards \
	-d "{
		\"location\": \"32.0,54.0\", \
		\"name\": \"Birthday\", \
		\"private\": false, \
		\"members\": [123, 456] \
	}"	
```

##Create Post

```sh
curl http://localhost:8080/api/boards/{board_id}/posts \
	-d "{
		\"user\": 123, \
		\"type\": \"text\", \
		\"embeds\": [], \
		\"content\": "hello, world" \
	}"	
```

##Upload Media

```sh
curl http://localhost:8080/api/assets/{asset_id}.png \
	-d @test-pic.png
```

##Get User Location

```sh
curl http://localhost:8080/api/users/{user_id}/location
```

##Set User Location

```sh
curl http://localhost:8080/api/users/{user_id}/location \
	-d "32.0,54.0"	
```

##Locate Users

```sh
curl http://localhost:8080/api/users/locate \
	-d "32.0,54.0"	
```

##Locate Boards

```sh
curl http://localhost:8080/api/boards/locate \
	-d "32.0,54.0"	
```

##Invite Users

```sh
curl http://localhost:8080/api/boards/{board_id}/invite \
	-d "{
		\"from\": 123, \
		\"to\": 123, \
		\"message\": \"you should come!\" \
	}"
```

##Get User Invitations


```sh
curl http://localhost:8080/api/users/{user_id}/invitations
```