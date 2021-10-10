import { Logger } from "./logger";

export class Helper {

    private static description = "node-httpc is a curl-like application but supports HTTP protocol only."

    private static help: Map<string, string> = new Map([
        ['get', 'executes a HTTP GET request and prints the response.'],
        ['post', 'executes a HTTP POST request and prints the response.'],
        ['help', 'prints this screen.']
    ])
    private static getFlags: Map<string, string> = new Map([
        ['(get|delete)', ''],
        ['-v', 'Prints the detail of the response such as protocol, status, and headers.'],
        ['-h, --header <{key: value}>', ''],
        ['-p, --port <number>', ''],
        ['-o, --output <output>', ''],
        ['(url)', '']
    ]);

    private static postFlags: Map<string, string> = new Map([
        ['(post|put)', ''],
        ['-v', 'Prints the detail of the response such as protocol, status, and headers.'],
        ['-h, --header <{key: value}>', ''],
        ['-p, --port <number>', ''],
        ['(-d|-f) <text|filepath>', ''],
        ['-o, --output <output>', ''],
        ['(url)', '']
    ]);

    public static printHelper() {
        const log = Logger.getInstance();
        log.group('usage:');
        log.info('httpc command [arguments]');
        log.group('The commands are');
        Helper.help.forEach((value, key) => {
            log.info(`${key}:\t${value}\n`);
        });
        log.info('Use "httpc help [command]" for more information about a command.');
        log.groupEnd();
        log.groupEnd();
    }


    public static printCommand(command: string) {
        const log = Logger.getInstance();
        let map;
        if (command == 'get' || command == 'delete') {
            map = Helper.getFlags;
        } else if (command == 'post' || command === 'put') {
            map = Helper.postFlags;
        } else {
            this.printHelper();
            return;
        }
        const usage: string = Helper.getUsage(map);
        log.group('usage:');
        log.info(usage);
        log.newline();
        log.group('flags:');
        map.forEach((value, key) => {
            log.info(`${key}:\t${value}\n`);
        });
        log.newline();
        log.groupEnd();
        log.groupEnd();
    }

    private static getUsage(map: Map<string, string>): string {
        let usage = 'httpc ';
        map.forEach((value, key) => {
            usage += key + " ";
        });
        return usage;
    }

}


