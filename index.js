const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('service.proto');
const { calculator } = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

function add(call, callback) {
  const { num1, num2 } = call.request;
  const result = num1 + num2;
  callback(null, { result });
}

function multiply(call, callback) {
  const { num1, num2 } = call.request;
  const result = num1 * num2;
  callback(null, { result });
}

server.addService(calculator.Calculator.service, { Add: add, Multiply: multiply });

const bindAddr = '0.0.0.0:50051';
server.bind(bindAddr, grpc.ServerCredentials.createInsecure());

server.start();

console.log(`gRPC server running on ${bindAddr}`);
