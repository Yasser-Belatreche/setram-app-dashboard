import { Employee } from '../base/Employee';

export type GetEmployeesSuccessResponse = {
    pagination: { total: number; totalPages: number };
    list: Employee[];
};
