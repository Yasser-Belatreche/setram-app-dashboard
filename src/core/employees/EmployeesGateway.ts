import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';
import { GatewayException } from '../GatewayException';

import { CreateEmployeeBody } from './api-contract/create-employee/CreateEmployeeBody';
import { CreateEmployeeErrorResponse } from './api-contract/create-employee/CreateEmployeeErrorResponse';
import { CreateEmployeeSuccessResponse } from './api-contract/create-employee/CreateEmployeeSuccessResponse';

import { GetEmployeesQueryParams } from './api-contract/get-employees/GetEmployeesQueryParams';
import { GetEmployeesErrorResponse } from './api-contract/get-employees/GetEmployeesErrorResponse';
import { GetEmployeesSuccessResponse } from './api-contract/get-employees/GetEmployeesSuccessResponse';

import { DeleteEmployeesErrorResponse } from './api-contract/delete-employee/DeleteEmployeesErrorResponse';

import { GetEmployeeErrorResponse } from './api-contract/get-employee/GetEmployeeErrorResponse';
import { GetEmployeeSuccessResponse } from './api-contract/get-employee/GetEmployeeSuccessResponse';

import { EditEmployeeBody } from './api-contract/edit-employee/EditEmployeeBody';
import { EditEmployeeErrorResponse } from './api-contract/edit-employee/EditEmployeeErrorResponse';
import { EditEmployeeSuccessResponse } from './api-contract/edit-employee/EditEmployeeSuccessResponse';

import { EditEmployeePlanningBody } from './api-contract/edit-employee-planning/EditEmployeePlanningBody';
import { GetEmployeePlanningErrorResponse } from './api-contract/get-employee-planning/GetEmployeePlanningErrorResponse';
import { GetEmployeePlanningSuccessResponse } from './api-contract/get-employee-planning/GetEmployeePlanningSuccessResponse';

import { EditEmployeePlanningErrorResponse } from './api-contract/edit-employee-planning/EditEmployeePlanningErrorResponse';
import { EditEmployeePlanningSuccessResponse } from './api-contract/edit-employee-planning/EditEmployeePlanningSuccessResponse';

import { AuthGateway } from '../auth/AuthGateway';

const EmployeesGateway = {
    async CreateEmployee(body: CreateEmployeeBody): Promise<CreateEmployeeSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Post<
            CreateEmployeeSuccessResponse,
            CreateEmployeeErrorResponse
        >(`${BASE_URL}/admin/employees`, body, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetEmployees(query: GetEmployeesQueryParams): Promise<GetEmployeesSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetEmployeesSuccessResponse, GetEmployeesErrorResponse>(
            `${BASE_URL}/admin/employees?page=${query.page}&perPage=${query.perPage}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async DeleteEmployee(id: string): Promise<void> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Delete<void, DeleteEmployeesErrorResponse>(
            `${BASE_URL}/admin/employees/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }
    },

    async GetById(id: string): Promise<GetEmployeeSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetEmployeeSuccessResponse, GetEmployeeErrorResponse>(
            `${BASE_URL}/admin/employees/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async EditEmployee(id: string, body: EditEmployeeBody): Promise<EditEmployeeSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Patch<
            EditEmployeeSuccessResponse,
            EditEmployeeErrorResponse
        >(`${BASE_URL}/admin/employees/${id}`, body, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetEmployeePlanning(id: string): Promise<GetEmployeePlanningSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<
            GetEmployeePlanningSuccessResponse,
            GetEmployeePlanningErrorResponse
        >(`${BASE_URL}/admin/employees/${id}/planning`, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async EditEmployeePlanning(
        id: string,
        body: EditEmployeePlanningBody,
    ): Promise<EditEmployeePlanningSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Patch<
            EditEmployeePlanningSuccessResponse,
            EditEmployeePlanningErrorResponse
        >(`${BASE_URL}/admin/employees/${id}/planning`, body, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },
};

export { EmployeesGateway };
