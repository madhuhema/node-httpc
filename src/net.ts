import { createConnection } from "net";

console.log('arguments', process.argv);

let request: string =
`GET /get?course=networking&assignment=1 HTTP/1.1
Host: httpbin.org

`;

const client = createConnection(80, 'httpbin.org');


client.on('data', buf => {
  console.log(buf.toString("utf-8"));
});

client.on('connect', () => {
    console.log('connected to server');
    console.log('sending request');
    client.write(request);
})

client.on('error', err => {
    console.log('socket error %j', err);
    process.exit(-1);
});

client.on('end', () => {
    console.log('disconnected from server');
  });

