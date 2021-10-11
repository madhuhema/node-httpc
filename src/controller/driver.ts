import { writeFileSync } from "fs";
import { netConnection } from "../model/net";
import { HTTPParser } from "../model/parser";
import { Response } from "../model/response";
import { HTTPValidator } from "../model/validator";
import { Helper } from "../utils/helper";
import { Logger } from "../utils/logger";
import { Redirect } from "./redirect";

export class Driver {
    private logger: Logger = Logger.getInstance();

    public async init() {
        const i = HTTPValidator.isHelper(process.argv)
        if (i > 0) {
            if (process.argv.length >= i + 1) {
                Helper.printCommand(process.argv[i + 1]);
            } else {
                Helper.printHelper();
            }
            return;
        }
        // will store '1' or '0' instead of boolean. because process variables will be string
        if (process.env.verbose !== '1') {
            process.env.verbose = HTTPValidator.isVerbose(process.argv);
        }
        const httpParser = new HTTPParser(new HTTPValidator());
        const request = httpParser.parse();
        this.logger.debug('request template', request.getRequestAsHttp());
        const response: Response = await netConnection(request);

        // redirection logic needs to be added here
        if (response.location && response.location.length > 0) {
            await new Redirect().init(response);
            return;
        }
        // write response to file or console
        if (process.env.outputPath && process.env.outputPath.length > 0) {
            writeFileSync(process.env.outputPath, response.template);
        } else {
            this.logger.info(response.template);
        }
        return;
    }
}