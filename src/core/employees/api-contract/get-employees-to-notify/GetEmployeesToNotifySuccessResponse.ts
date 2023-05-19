import { Employee } from '../base/Employee';
import { EmployeeDevice } from '../base/EmployeeDevice';

export type GetEmployeesToNotifySuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: (Employee & { devices: EmployeeDevice[] })[];
};
