// Initialize WebHooks module.
var WebHooks = require('node-webhooks')

//setup https
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('sslcert/domain.key', 'utf8');
var certificate = fs.readFileSync('sslcert/domain.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

//setup express
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000;

app.use(bodyParser.json());

app.post('/', function (req, res) {
    var body = req.body;

    console.log(body);

    res.json({
        final_response: 'ok got it!'
    });
});

//setup server
var httpsServer = https.createServer(credentials, app);

var server = httpsServer.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Server listening at port %s', port)
});