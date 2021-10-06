import { createConnection } from "net";
import { Request } from "./model/request";


export function netConnection(request:Request) {
  console.log('arguments', process.argv);
  const client = createConnection(request.port, request.host);


  client.on('data', buf => {
    console.log(buf.toString("utf-8"));
  });

  client.on('connect', () => {
    console.log('connected to server');
    console.log('sending request');
    client.write(request.getRequestAsHttp());
  })

  client.on('error', err => {
    console.log('socket error %j', err);
    process.exit(-1);
  });

  client.on('end', () => {
    console.log('disconnected from server');
  });
}



