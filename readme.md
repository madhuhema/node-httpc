# HTTPC
## _cURL like command Line Application and Network Protocol Software Library_

httpc is a curl-like application but supports HTTP protocol only.

## httpc installation

httpc requires [Node.js](https://nodejs.org/) to run.

Install the node dependencies and follow the below steps.

```sh
cd your-project-folder
npm i httpc-comp6461
```

## httpc commands

Help:

```sh
httpc help
```

```
Usage :
 httpc command [arguments]
```

```
The commands are :
 get -> executes a HTTP GET request and prints the response.
 post -> executes a HTTP POST request and prints the response.
 help -> prints this screen.
Use "httpc help [command]" for more information about a command
```

_Help command for Specific method_

help for GET:

```sh
httpc help get
```

```
usage: httpc get [-v] [-h key:value] URL

```
Get -> executes a HTTP GET request for a given URL.

help for POST:

```sh
httpc help post
```
```
usage: httpc post [-v] [-h key:value] [-d inline-data] [-f file] URL

```
Post -> executes a HTTP POST request for a given URL with inline data or from 
file.

## GET | DELETE
Get executes a HTTP GET request for a given URL.

## Usage

```sh
 httpc get|delete [-v] [-h key:value] URL
```

| Flag | Description |
| ------ | ------ |
| -v  | Prints the detail of the response such as protocol, status, and headers.|
| -h key:value | Associates headers to HTTP Request with the format 'key:value'.|
| -p | Specifies the port number |


## POST | PUT

Post executes a HTTP POST request for a given URL with inline data or from 
file.

## Usage

```sh
httpc post|put [-v] [-h key:value] [-d inline-data] [-f file] URL
```

| Flag | Description |
| ------ | ------ |
| -v  | Prints the detail of the response such as protocol, status, and headers.|
| -h key:value  | Associates headers to HTTP Request with the format 'key:value'.|
| -p | Specifies the port number |
| -d string  | Associates an inline data to the body HTTP POST request. |
| -f file | Associates the content of a file to the body HTTP POST request. |
Either [-d] or [-f] can be used but not both.

# EXAMPLES
GET with query parameters:
```sh
httpc get 'http://httpbin.org/get?course=networking&assignment=1'
```

```
Output:
{
 "args": {
 "assignment": "1",
 "course": "networking"
 },
 "headers": {
 "Host": "httpbin.org",
 "User-Agent": "Concordia-HTTP/1.0"
 },
 "url": "http://httpbin.org/get?course=networking&assignment=1"
}
```

GET with verbose option:

```sh
httpc get -v 'http://httpbin.org/get?course=networking&assignment=1'
```

```
Output:
HTTP/1.1 200 OK
Server: nginx
Date: Fri, 1 Sep 2017 14:52:12 GMT
Content-Type: application/json
Content-Length: 255
Connection: close
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
{
 "args": {
 "assignment": "1",
 "course": "networking"
 },
 "headers": {
 "Host": "httpbin.org",
 "User-Agent": "Concordia-HTTP/1.0"
 },
 "url": "http://httpbin.org/get?course=networking&assignment=1"
}
```

Post with inline data:

```sh
httpc post -h Content-Type:application/json --d '{"Assignment": 1}' 
http://httpbin.org/post
```

```
Output:
{
 "args": {},
 "data": "{\"Assignment\": 1}",
 "files": {},
 "form": {},
 "headers": {
 "Content-Length": "17",
 "Content-Type": "application/json",
 "Host": "httpbin.org",
 "User-Agent": "Concordia-HTTP/1.0"
 },
 "json": {
 "Assignment": 1
 },
 "url": "http://httpbin.org/post"
}
```

## Write response to specific file

```
httpc -v 'http://httpbin.org/get?course=networking&assignment=1' -o hello.txt

```