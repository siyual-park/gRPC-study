import {
  sendUnaryData,
  ServerUnaryCall,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import _ from "lodash";
import jsonfile from "jsonfile";
import path from "path";
import { EmployeeRequest, EmployeeResponse } from "../../generated/employee_pb";
import { IEmployeeServer } from "../../generated/employee_grpc_pb";

class Employee implements IEmployeeServer {
  [method: string]: UntypedHandleCall;

  private readonly data = jsonfile.readFileSync(
    path.join(__dirname, "../../data.json")
  );

  getDetails(
    call: ServerUnaryCall<EmployeeRequest, EmployeeResponse>,
    callback: sendUnaryData<EmployeeResponse>
  ): void {
    const response = new EmployeeResponse();
    response.setMessage(_.find(this.data, { id: call.request.getId() }));

    callback(null, response);
  }
}

export default Employee;
