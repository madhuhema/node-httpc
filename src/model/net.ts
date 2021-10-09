import { writeFileSync } from "fs";
import { createConnection } from "net";
import { Request } from "./request";
import { Response } from "./response";
import { Logger } from "../utils/logger";

const log = Logger.getInstance();

export function netConnection(request: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
        log.debug('arguments', process.argv);
        const client = createConnection(request.port, request.host);


        client.on('data', buf => {
            let response = Response.fromTemplate(buf.toString('utf-8'));
            response.copyFromRequest(request);
            if (response.location.indexOf("https:") > 0) {
                log.debug('https port');
                response.port = 443;
            }
            resolve(response);
        });

        client.on('connect', () => {
            log.debug('connected to server');
            log.debug('sending request');
            client.write(request.getRequestAsHttp());
        })

        client.on('error', err => {
            log.error('socket error %j', err);
            reject(err);
        });

        client.on('end', () => {
            log.debug('disconnected from server');
        });

    })
}



