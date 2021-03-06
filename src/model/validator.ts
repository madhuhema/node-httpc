import { existsSync, writeFileSync } from "fs";
import { Logger } from "../utils/logger";
import { ErrorCodes } from "./errorcodes";
import { getMethodArray, getMethodByName, Method } from "./method";

export class HTTPValidator implements Validator {

    queryParamsMatcher = /(\?|\&)([^=]+)\=([^&]+)/g;
    httpMatcher = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

    validate(commandArr: string[]): ErrorCodes[] {
        let errors: ErrorCodes[] = []
        let methodAvailable = 0;
        let urlAvailable = 0;
        let bodyRequired = false;
        let bodies = 0;

        commandArr.forEach((command, i, arr) => {
            // check if it has HTTP method
            if (getMethodArray().includes(command.toLowerCase())) {
                methodAvailable++;
                if(getMethodByName(command) === Method.POST || getMethodByName(command) === Method.PUT) {
                    bodyRequired = true;
                }
            }

            // port
            if (command === "-p" && arr.length <= i) {
                errors.push(ErrorCodes.PORTNOTGIVEN);
            } else if (command === "-p" && !arr[i + 1].match(/[0-9]/g)) {
                errors.push(ErrorCodes.PORTNAN)
            }

            // check headers
            if (command === "-h" && arr.length <= i) {
                errors.push(ErrorCodes.HEADER);
            } else if (command === "-h" && !this.validateHeader(arr[i + 1])) {
                errors.push(ErrorCodes.HEADER);
            }

            //check body
            if(command === "-d" || command === "-f") {
                bodies++;
            }
            if (command === "-d" && arr.length <= i) {
                errors.push(ErrorCodes.BODY);
            } else if (command === "-d" && !this.validateBody(arr[i + 1])) {
                errors.push(ErrorCodes.BODY);
            }

            if (command === "-f" && !this.validatePath(arr[i + 1])) {
                errors.push(ErrorCodes.NOFILE);
            }

            //check outputfile
            if (command === "-o" && arr.length <= i) {
                errors.push(ErrorCodes.NOOUTPUTFILE)
            } else if (command === "-o" && !this.validateOutputPath(arr[i + 1])) {
                errors.push(ErrorCodes.NOTVALIDOUTPUTPATH)
            }

            // http matcher
            if (command.indexOf('http:') === 0 || command.indexOf('https:') === 0) {
                urlAvailable++;
                if (!command.match(this.httpMatcher)) {
                    errors.push(ErrorCodes.URLMALFORMED);
                }
            }
        });

        if (methodAvailable == 0) errors.push(ErrorCodes.NOMETHOD);
        if (methodAvailable > 1) errors.push(ErrorCodes.TOOMANYMETHODS);
        if (urlAvailable == 0) errors.push(ErrorCodes.NOURL);
        if (urlAvailable > 1) errors.push(ErrorCodes.TOOMANYURL);
        if(bodyRequired){
            if(bodies == 0) {
                errors.push(ErrorCodes.NOBODY);
            }
            if(bodies > 1) {
                errors.push(ErrorCodes.TOOMANYBODIES);
            }
        }
        return errors;
    }
    validateOutputPath(path: string) {
        try {
            writeFileSync(path, '');
            return this.validatePath(path);
        } catch (err) {
            const log = Logger.getInstance();
            log.debug(err);
            return false;
        }
    }

    private validateBody(command: string): boolean {
        if (command.length == 0) return false;
        return true;
    }

    private validatePath(command: string) {
        try {
            if (existsSync(command)) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }

    }

    private validateHeader(command: string): boolean {


        // should not be a flag
        if (command.charAt(0) === "-") {
            return false;
        }
        // should have a colon
        if (command.indexOf(":") < 0 || command.indexOf(":") !== command.lastIndexOf(":")) {
            return false;
        }
        if (command.split(":").length != 2)
            return false;
        let [key, value] = command.split(":");
        if (key.endsWith("-")) return false;

        return true;
    }

    public static isVerbose(commandArr: string[]) {
        if (commandArr.includes("-v") || commandArr.includes("--verbose")) {
            return '1';
        }
        return '0';
    }

    static isHelper(commandArr: string[]) {
        return commandArr.indexOf("help");
    }
}

export interface Validator {
    validate(arr: string[]): ErrorCodes[];
}