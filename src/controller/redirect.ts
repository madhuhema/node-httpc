import { writeFileSync } from "fs";
import { hrtime } from "process";
import { URL } from "url";
import { netConnection } from "../model/net";
import { Request } from "../model/request";
import { Response } from "../model/response";
import { Logger } from "../utils/logger";

export class Redirect {

    logger: Logger = Logger.getInstance();

    public async init(prevResponse: Response) {
        this.logger.info(`redirecting due to ${prevResponse.statusCode} response`);
        this.logger.debug(prevResponse);
        let url = new URL(prevResponse.location);
        const request = new Request();
        request.host = url.host;
        request.port = url.port == '' ? 80 : parseInt(url.port);
        request.url = url.host + url.pathname;
        request.path = url.pathname.substring(1);
        request.queryPath = url.pathname + url.search;
        request.queryParams = url.searchParams;
        request.method = prevResponse.method;
        request.headers = prevResponse.headers;
        request.body = prevResponse.body;
        const response: Response = await netConnection(request);
        this.logger.debug('redirect request', request);
        this.logger.debug('redirect template');
        this.logger.debug(request.getRequestAsHttp());
        this.logger.debug("redirect.ts received reponse:", response);
        // if redirection has another redirection
        // if (response.location && response.location.length > 0) {
        //     try {
        //         await new Redirect().init(response);
        //         return;
        //     } catch (err) {
        //         this.logger.error(err);
        //     }
        // }
        // write response to file or console
        if (process.env.outputPath && process.env.outputPath.length > 0) {
            this.logger.info('writing redirected response to path', process.env.outputPath);
            writeFileSync(process.env.outputPath, response.template);
        } else {
            this.logger.info("redirected response...");
            this.logger.info(response.template);
        }
        return;
    }

}