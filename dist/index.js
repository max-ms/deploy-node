var express = require('express');
var routes = require('./routes');
var fs = require('fs');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get("/", function (req, res) {

    var Twitter = require('twitter');
    // Set up Twitter client
    var client = new Twitter({
        consumer_key: 'XWV0skHGNgH7dCWLosZC6ZP2c',
        consumer_secret: 'GJng437jsKUUsz80sIvdXcBPcgjRoZB5QmE6g16zFfm0iRabn5',
        access_token_key: '4104862574-DF32tAHtckiQu2HEi1ncNIVlX8CV23mqO51NitI',
        access_token_secret: 'dTWU9vuPBlSoREI2Zqggr2gidGvC7ojHB26hNMJ24fT9V'
    });
    // Set up connection to Redis

    client.stream('statuses/filter', { track: 'javascript', lang: 'en' }, function (stream) {
        stream.on('data', function (tweet) {
            // Log it to console
            console.log(tweet);
        });
        // Handle errors
        stream.on('error', function (error) {
            console.log(error);
        });
    });

    const state = {
        tweets: [{ text: 'tweet 1' }, { text: 'awesome tweet!' }]
    };

    res.render('home', {
        state: JSON.stringify(state)
    });
});

//app.get("/page/:page/:skip", routes.page)
app.use("/", express.static(__dirname + "/public/"));

var server = app.listen(3000, function () {
    console.log("listening on port 3000...");
});

var io = require('socket.io').listen(server);
setInterval(function () {
    io.emit('data', { time: Date.now() });
}, 1000);