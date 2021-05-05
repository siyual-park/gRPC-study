import {
  sendUnaryData,
  ServerUnaryCall,
  UntypedHandleCall,
} from "@grpc/grpc-js";
import _ from "lodash";
import jsonfile from "jsonfile";
import path from "path";
import {
  EmployeeDetails,
  EmployeeRequest,
  EmployeeResponse,
} from "../../generated/employee_pb";
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

    const employee = _.find(this.data, { id: call.request.getId() });
    const employeeDetails = new EmployeeDetails();
    if (employee != null) {
      employeeDetails.setId(employee.id);
      employeeDetails.setEmail(employee.email);
      employeeDetails.setFirstname(employee.firstname);
      employeeDetails.setLastname(employee.lastname);
    }

    response.setMessage(employeeDetails);

    callback(null, response);
  }
}

export default Employee;
