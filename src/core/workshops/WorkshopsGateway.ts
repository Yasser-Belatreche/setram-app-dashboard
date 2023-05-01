import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';
import { GatewayException } from '../GatewayException';

import { CreateWorkshopBody } from './api-contract/create-workshop/CreateWorkshopBody';
import { CreateWorkshopSuccessResponse } from './api-contract/create-workshop/CreateWorkshopSuccessResponse';

import { EditWorkshopBody } from './api-contract/edit-workshop/EditWorkshopBody';
import { EditWorkshopSuccessResponse } from './api-contract/edit-workshop/EditWorkshopSuccessResponse';
import { CreateWorkshopErrorResponse } from './api-contract/create-workshop/CreateWorkshopErrorResponse';

import { GetWorkshopErrorResponse } from './api-contract/get-workshop/GetWorkshopErrorResponse';
import { EditWorkshopErrorResponse } from './api-contract/edit-workshop/EditWorkshopErrorResponse';
import { GetWorkshopSuccessResponse } from './api-contract/get-workshop/GetWorkshopSuccessResponse';

import { GetWorkshopsQueryParams } from './api-contract/get-workshops/GetWorkshopsQueryParams';
import { GetWorkshopsErrorResponse } from './api-contract/get-workshops/GetWorkshopsErrorResponse';
import { GetWorkshopsSuccessResponse } from './api-contract/get-workshops/GetWorkshopsSuccessResponse';

import { DeleteWorkshopErrorResponse } from './api-contract/delete-workshop/DeleteWorkshopErrorResponse';

import { AuthGateway } from '../auth/AuthGateway';

const WorkshopsGateway = {
    async CreateWorkshop(body: CreateWorkshopBody): Promise<CreateWorkshopSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Post<
            CreateWorkshopSuccessResponse,
            CreateWorkshopErrorResponse
        >(`${BASE_URL}/admin/news/workshops`, body, {
            Authorization: token,
            'Content-Type': 'application/json',
        });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async EditWorkshop(id: string, body: EditWorkshopBody): Promise<EditWorkshopSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Patch<
            EditWorkshopSuccessResponse,
            EditWorkshopErrorResponse
        >(`${BASE_URL}/admin/news/workshops/${id}`, body, {
            Authorization: token,
            'Content-Type': 'application/json',
        });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetWorkshop(id: string): Promise<GetWorkshopSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetWorkshopSuccessResponse, GetWorkshopErrorResponse>(
            `${BASE_URL}/admin/news/workshops/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async GetWorkshops(query: GetWorkshopsQueryParams): Promise<GetWorkshopsSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetWorkshopsSuccessResponse, GetWorkshopsErrorResponse>(
            `${BASE_URL}/admin/news/workshops`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async DeleteWorkshop(id: string): Promise<void> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Delete<void, DeleteWorkshopErrorResponse>(
            `${BASE_URL}/admin/news/workshops/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },
};

export { WorkshopsGateway };
