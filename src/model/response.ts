import { getMethodByName } from "./method";
import { Request } from "./request";

export class Response {
    method: any;
    headers: Map<string, string> = new Map();
    statusCode!: number;
    location!: string;
    template!: string;
    port!: number;

    public static fromTemplate(template: string): Response {
        let response = new Response();
        let templateArr = template.split('\r\n');
        // parse path and queryparams
        let [httpVersion, statusCode, status] = templateArr[0].split(" ");
        response.statusCode = parseInt(statusCode);
        response.template = template;
        // parse headers
        for (let i = 1; i < templateArr.length; i++) {
            let header = templateArr[i];
            if (header == '\r\n') {
                break;
            }
            let colon = header.indexOf(':');
            const key = header.substring(0, colon);
            const value = header.substring(colon + 1);
            // const [key, value] = header.split(':');
            if (key == "") {
                continue;
            }
            response.headers.set(key.toUpperCase(), value);
        }
        // even if it is not 3xx response we can still redirect if location is available
        // reference: https://httpwg.org/specs/rfc7231.html#header.location
        if (response.headers.has('LOCATION')) {
            response.location = response.headers.get('LOCATION') as string;
        }
        return response;
    }

    public copyFromRequest(request: Request) {
        this.port = request.port;
        this.method = request.method;
        this.headers = request.headers;
        this.headers.delete('Host');
        // request.headers.forEach((value, key) => this.headers.set(key, value));
    }
}