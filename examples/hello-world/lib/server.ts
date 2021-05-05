import { Server, ServerCredentials } from "@grpc/grpc-js";
import { EmployeeService } from "../generated/employee_grpc_pb";
import { Employee } from "./service";

function main() {
  const server = new Server({
    "grpc.max_receive_message_length": -1,
    "grpc.max_send_message_length": -1,
  });

  server.addService(EmployeeService, new Employee());
  server.bindAsync(
    "0.0.0.0:50051",
    ServerCredentials.createInsecure(),
    (error) => {
      if (error != null) {
        throw error;
      }
      server.start();
    }
  );
}

main();
