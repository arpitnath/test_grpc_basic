const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('calculator.proto');
const { CalculatorService } = grpc.loadPackageDefinition(packageDefinition);

function add(call, callback) {
  const { num1, num2 } = call.request;

  console.log('---options', {x: call.metadata });
  const result = num1 + num2;
  callback(null, { result });
}

const server = new grpc.Server();
server.addService(CalculatorService.service, { Add: add });
server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Calculator gRPC server running on port 50052');
});
