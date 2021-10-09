#! /usr/bin/env node
import { Driver } from "./controller/driver";
import { Helper } from "./utils/helper";

new Driver().init();
// Helper.printHelper();