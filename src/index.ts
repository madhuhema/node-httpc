import { HTTPParser } from "./model/parser";
import { HTTPValidator } from "./model/validator";

new HTTPParser(new HTTPValidator()).parse();