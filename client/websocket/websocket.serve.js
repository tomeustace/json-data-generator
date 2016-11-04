 /**
 * A WebSocket Server that sends generated randon json data, on client connection, according to user defined schemas.
 */
var generator = require('../../src/data.generator');
var entity = require('../../src/entity');

var WebSocketServer = require('websocket').server;
var http = require('http');
var interval;

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production 
    // applications, as it defeats all standard cross-origin protection 
    // facilities built into the protocol and the browser.  You should 
    // *always* verify the connection's origin and decide whether or not 
    // to accept it. 
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin 
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    //accept requests for custom-protocol
    var connection = request.accept('custom-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
	var entityArr = ['person'];
    entity.setEntities(entityArr);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
			//using set interval to push data, currently every 1 second
			interval = setInterval(function() {
				var json = generator.generateEntityData(10);
				var msg = { type: "message", text: json, date: Date.now() };

				// Send the msg object as a JSON-formatted string.
				connection.send(JSON.stringify(msg));	
			}, 1000);
			
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		clearInterval(interval);
    });
});
