var secrets = require('./secrets.js');
var https = require('https');

var email = '<your e-mail>',
  password = '<your password>',
  data = {
  branch: 'default',
  modules: {
    main: 'require("hello");',
    hello: 'console.log("Hello World!");'
  }
};

var req = https.request({
  hostname: 'screeps.com',
  port: 443,
  path: '/api/user/code',
  method: 'POST',
  auth: secrets.email + ':' + secrets.password,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}, function(res) {
  console.log('STATUS-CODE:' + res.statusCode)
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.write(JSON.stringify(data));
req.end();
