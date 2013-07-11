##Get Token


##Make Account


##Get Boards

```sh
	curl http://localhost:8080/api/boards/{user_id}
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
			\"members\": [123, 456], \
		}"	
```

##Create Post

```sh
	curl http://localhost:8080/api/boards/{board_id}/posts \
		-d "{
			\"user\": 123, \
			\"type\": \"text\", \
			\"embeds\": [], \
			\"content\": "hello, world", \
		}"	
```

##Locate Users

##Invite Users