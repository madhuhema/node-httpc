
export class Logger {

    log: Console = console;
    static obj: Logger | null = null;

    private constructor() {

    }

    public info(message?: any, ...optionalParams: any[]) {
        this.log.info(message, ...optionalParams);
    }

    public debug(message?: any, ...optionalParams: any[]) {
        if (process.env.verbose == '1') {
            this.log.debug(message, ...optionalParams);
        }
    }

    public error(message?: any, ...optionalParams: any[]) {
        this.log.error(message, ...optionalParams);
    }

    public group(title: string) {
        const length = title.length;
        const underline = new Array(length + 1).join("-");
        this.log.group(title + "\n" + underline);
    }

    public groupEnd() {
        this.log.groupEnd();
    }

    public newline() {
        this.log.info('\n');
    }

    public static getInstance() {
        if (Logger.obj == null) {
            Logger.obj = new Logger();
        }
        return Logger.obj;
    }

}