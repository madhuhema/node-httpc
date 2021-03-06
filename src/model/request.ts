import { randomUUID } from "crypto";
import { getMethodByName, Method } from "./method";
import { requestWithBody, requestWithoutBody } from "./requestTemplate";

export class Request {

    private crlf = '\r\n';
    private request!: string;
    public rqid!: string;
    public host!: string;
    public url!: string;
    public path!: string;
    public queryPath!: string;
    public queryParams!: any;
    public port: number = 80;
    public method!: Method;
    public headers: Map<string, string> = new Map();
    public body: string = ""

    public getRequestAsHttp() {
        this.initialize();
        return this.request;
    }

    private initialize() {
        let request: string = '';
        this.rqid = randomUUID();
        this.headers.set('rqid', this.rqid);
        this.setHost(this.host);
        if (this.method === Method.GET || this.method === Method.DELETE) {
            request = requestWithoutBody;
        } else {
            request = requestWithBody;
            request = this.setBody(request, this.body);
        }
        request = this.setMethod(request, this.method);
        request = this.setHeaderTemplate(request);
        request = this.setQueryPath(request, this.queryPath);
        this.request = request;
    }

    private setHeaderTemplate(template: string): string {
        let headerTemplate: string = "";
        this.headers.forEach((value, key) => {
            headerTemplate += `${key}: ${value}${this.crlf}`;
        });
        template = template.replace('%HEADERS%', headerTemplate);
        return template;
    }

    private setBody(template: string, body: string): string {
        template = template.replace('%BODY%', body);
        this.headers.set('Content-Length', body.length.toString());
        return template;
    }

    private setMethod(template: string, method: Method): string {
        template = template.replace('%METHOD%', method.toString().toUpperCase());
        return template;
    }

    private setQueryPath(template: string, queryPath: string): string {
        template = template.replace('%QUERYPATH%', queryPath);
        return template;
    }

    private setHost(host: string) {
        this.headers.set('Host', host);
    }
}
