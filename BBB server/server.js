var b = require('bonescript');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
// Create a variable called led, which refers to P9_14
var led = "P9_14";
// Initialize the led as an OUTPUT
b.pinMode(led, b.OUTPUT);

// Initialize the server on port 8888
var server = app.listen(8888);

// Loading socket io module
var io = require('socket.io').listen(server);

// When communication is established
io.on('connection', function (socket) {
    socket.on('changeState', handleChangeState);
});

app.post('/act', function(req, res){
    console.log(req.body);
    handleChangeState({state: req.body.state})
    res.status(200).json({status: true});
});
// Change led state when a button is pressed
function handleChangeState(data) {
    var newData = data;
    console.log("LED = " + newData.state);
    // turns the LED ON or OFF
    b.digitalWrite(led, newData.state);
}

// Displaying a console message for user feedback
console.log("Server Running ...");