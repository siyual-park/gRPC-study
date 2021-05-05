import path from "path";
import _ from "lodash";
import grpc, { ProtobufMessage, sendUnaryData, ServerUnaryCall } from "grpc";
import * as protoLoader from "@grpc/proto-loader";
import jsonfile from "jsonfile";
import {
  EmployeeRequest,
  EmployeeResponse,
} from "../generated/proto/employee_pb";

const data = jsonfile.readFileSync("./data.json");

const PROTO_PATH = path.join(__dirname, "../", "./proto/employee.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const employeeProto = grpc.loadPackageDefinition(packageDefinition).employee;

function getDetails(
  call: ServerUnaryCall<EmployeeRequest.AsObject>,
  callback: sendUnaryData<EmployeeResponse.AsObject>
) {
  callback(null, {
    message: _.find(data, { id: call.request.id }),
  });
}

function main() {
  const server = new grpc.Server();
  server.addService((employeeProto as ProtobufMessage).Employee.service, {
    getDetails,
  });
  server.bind("0.0.0.0:4500", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
