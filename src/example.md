# httpc

### Notes:
* Its always better to use double quotes and around URL, As they get truncated for few special characters.
* For enwrapping a use '" { } "', A single quote and then a double quote. While inside the json dont forget to escape special characters with \ character.
```
Example json = '"{ \"Assignment\" :\"1\"}"'
```

## HELP

```
httpc help
httpc help get
httpc help post
```

## GET
```
httpc get "http://httpbin.org/get?course=networking&assignment=1"

// with verbose

httpc get -v "http://httpbin.org/get?course=networking&assignment=1"

// headers
httpc get -h "Authorization:bearer cGFzc3dvcmQ=" "http://httpbin.org/get?course=networking&assignment=1"

// output file
httpc get "http://httpbin.org/get?course=networking&assignment=1" -o "./response.txt"

// all
httpc get -v -h "Authorization:bearer cGFzc3dvcmQ=" "http://httpbin.org/get?course=networking&assignment=1" -o "./response.txt"

```


## POST

```
// requires body
httpc post "http://httpbin.org/post"

// header and inline body
httpc post -h Content-Type:application/json -d '"{ \"Assignment\" :\"1\"}"' "http://httpbin.org/post?course=networking&assignment=1"

// with verbose
httpc post -v -h Content-Type:application/json -d '"{ \"Assignment\" :\"1\"}"' "http://httpbin.org/post?course=networking&assignment=1"

// header and file body
httpc post -h Content-Type:application/json -f "C:\projects\node-httpc\input.json" "http://httpbin.org/post?course=networking&assignment=1"

// header and inline body and write output to file
httpc post -h Content-Type:application/json -d '"{ \"Assignment\" :\"1\"}"' "http://httpbin.org/post?course=networking&assignment=1" -o "C:\projects\node-httpc\output.txt"

```

## PUT

```
// requires body
httpc put "http://httpbin.org/put"

// header and inline body
httpc put -h Content-Type:application/json -d '"{ \"Assignment\" :\"1\"}"' "http://httpbin.org/put?course=networking&assignment=1"

// with verbose
httpc put -v -h Content-Type:application/json -d '"{ \"Assignment\" :\"1\"}"' "http://httpbin.org/put?course=networking&assignment=1"

// header and file body
httpc put -h Content-Type:application/json -f "C:\projects\node-httpc\input.json" "http://httpbin.org/put?course=networking&assignment=1"

// header and inline body and write output to file
httpc put -h Content-Type:application/json -d '"{ \"Assignment\" :\"1\"}"' "http://httpbin.org/put?course=networking&assignment=1" -o "C:\projects\node-httpc\output.txt"

```

## DELETE
```
httpc delete "http://httpbin.org/delete?course=networking&assignment=1"

// with verbose

httpc delete -v "http://httpbin.org/delete?course=networking&assignment=1"

// headers
httpc delete -h "Authorization:bearer cGFzc3dvcmQ=" "http://httpbin.org/delete?course=networking&assignment=1"

// output file
httpc delete "http://httpbin.org/delete?course=networking&assignment=1" -o "./response.txt"

// all
httpc delete -v -h "Authorization:bearer cGFzc3dvcmQ=" "http://httpbin.org/delete?course=networking&assignment=1" -o "./response.txt"

```

## Redirection

```
// along with verbose
httpc get -v "http://httpbin.org/absolute-redirect/1"

```
