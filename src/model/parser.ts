import { readFileSync } from "fs";
import { URL } from "url";
import { Helper } from "../utils/helper";
import { Logger } from "../utils/logger";
import { ErrorCodes } from "./errorcodes";
import { getMethodArray, getMethodByName } from "./method";
import { Request } from "./request";
import { Validator } from "./validator";


export class Parser {
    commandArr!: string[];
    request!: Request;

    constructor(protected validator: Validator) {

    }

    parse() {
        this.commandArr = process.argv;
        let errors: ErrorCodes[] = this.validator.validate(this.commandArr);
        if (errors.length > 0) {
            this.printErrorAndExit(errors);
        }
    }

    private printErrorAndExit(errors: ErrorCodes[]) {
        const log = Logger.getInstance();
        log.group('Found Errors:');
        errors.forEach(error => {
            log.info('*\t', error.toString());
        })
        log.groupEnd();
        log.info('refer this:');
        Helper.printHelper();
        process.exit(0);
    }
}

export class HTTPParser extends Parser {

    constructor(protected validator: Validator) {
        super(validator);
    }

    parse(): Request {
        super.parse();
        this.request = new Request();
        this.parseVariables();
        return this.request;
    }

    private parseVariables() {
        const log = Logger.getInstance();
        this.commandArr.forEach((command, i, arr) => {
            if (getMethodArray().includes(command.toLowerCase())) {
                this.request.method = getMethodByName(command);
            }
            if (command === "-h") {
                const header: string = arr[i + 1];
                const [key, value] = header.split(":");
                this.request.headers.set(key, value);
            }
            if (command === "-d") {
                this.request.body = arr[i + 1];
            }
            if (command === "-f") {
                this.request.body = readFileSync(arr[i + 1]).toString("utf-8");
            }
            if (command.indexOf('http:') === 0) {
                let http = new URL(command);
                this.request.url = command;
                this.request.host = http.hostname;
                this.request.path = http.pathname.substring(1);
                this.request.queryPath = http.pathname + http.search;
                this.request.queryParams = http.searchParams;
                log.debug('request object', this.request);
            }
            if (command === "-p") {
                this.request.port = parseInt(arr[i + 1]);
            }
            if (command === "-o") {
                process.env.outputPath = arr[i + 1];
            }
        })
    }
}

