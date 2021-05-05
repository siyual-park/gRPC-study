import { credentials } from "@grpc/grpc-js";
import { EmployeeClient } from "../generated/employee_grpc_pb";
import { EmployeeRequest, EmployeeResponse } from "../generated/employee_pb";

const client = new EmployeeClient(
  "localhost:50051",
  credentials.createInsecure(),
  {
    "grpc.keepalive_time_ms": 120000,
    "grpc.http2.min_time_between_pings_ms": 120000,
    "grpc.keepalive_timeout_ms": 20000,
    "grpc.http2.max_pings_without_data": 0,
    "grpc.keepalive_permit_without_calls": 1,
  }
);

function getDetails(request: EmployeeRequest): Promise<EmployeeResponse> {
  return new Promise<EmployeeResponse>((resolve, reject) => {
    client.getDetails(request, (error, response) => {
      if (error != null) {
        return reject(error);
      }
      return resolve(response);
    });
  });
}

async function run() {
  const request = new EmployeeRequest();
  request.setId(1);
  await getDetails(request);
}

run().then(() => {});
