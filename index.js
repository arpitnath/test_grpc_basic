const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('service.proto');
const { GreetingService } = grpc.loadPackageDefinition(packageDefinition);

// Implement the "GetGreeting" method
function getGreeting(call, callback) {
  const name = call.request.name;
  const greetingMessage = `Hello, ${name}!`;

  const response = {
    greeting_message: greetingMessage,
  };

  callback(null, response);
}

// Create a gRPC server
const server = new grpc.Server();

// Add the "GetGreeting" method to the server
server.addService(GreetingService.service, { GetGreeting: getGreeting });

// Bind the server to a port and start listening
const bindAddr = '0.0.0.0:50051';
server.bind(bindAddr, grpc.ServerCredentials.createInsecure());

// Start the server
server.start();

console.log(`gRPC server running on ${bindAddr}`);
