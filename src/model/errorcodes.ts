export enum ErrorCodes {
    NOMETHOD = 'HTTP METHOD needs to be mentioned. Possible values: get, post, delete, put',
    HEADER = 'Header format is wrong, please check your command',
    BODY = 'Not a valid Body',
    NOBODY = 'No request body found',
    NOFILE = 'Please check the file path. Couldnot able to fetch the data from file',
    URLMALFORMED = 'Please check the url provided',
    TOOMANYMETHODS = 'You can provide only one HTTP method',
    NOURL = 'please provide the host address url',
    TOOMANYURL = 'please provide only one url',
    PORTNOTGIVEN = 'No port details provided',
    PORTNAN = 'Port provided is not a number',
    NOOUTPUTFILE = 'No Output File mentioned with -o flag',
    NOTVALIDOUTPUTPATH = "Check output file path mentioned",
    TOOMANYBODIES = "Either [-d] or [-f] can be used but not both. Found more than one body"
}