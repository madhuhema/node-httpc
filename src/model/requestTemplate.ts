export const requestWithoutBody = 
`%METHOD% %QUERYPATH% HTTP/1.0
%HEADERS%

`;

export const requestWithBody =
`%METHOD% %QUERYPATH% HTTP/1.0
%HEADERS%
%BODY%

`;

// https://www.mattzeunert.com/2018/10/25/manually-making-an-http-request-with-nodejs.html