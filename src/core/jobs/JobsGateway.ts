import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';
import { GatewayException } from '../GatewayException';

import { CreateJobBody } from './api-contract/create-job/CreateJobBody';
import { CreateJobSuccessResponse } from './api-contract/create-job/CreateJobSuccessResponse';

import { EditJobBody } from './api-contract/edit-job/EditJobBody';
import { EditJobSuccessResponse } from './api-contract/edit-job/EditJobSuccessResponse';
import { CreateJobErrorResponse } from './api-contract/create-job/CreateJobErrorResponse';

import { GetJobErrorResponse } from './api-contract/get-job/GetJobErrorResponse';
import { EditJobErrorResponse } from './api-contract/edit-job/EditJobErrorResponse';
import { GetJobSuccessResponse } from './api-contract/get-job/GetJobSuccessResponse';

import { GetJobsQueryParams } from './api-contract/get-jobs/GetJobsQueryParams';
import { GetJobsErrorResponse } from './api-contract/get-jobs/GetJobsErrorResponse';
import { GetJobsSuccessResponse } from './api-contract/get-jobs/GetJobsSuccessResponse';

import { DeleteJobErrorResponse } from './api-contract/delete-job/DeleteJobErrorResponse';

import { AuthGateway } from '../auth/AuthGateway';

const JobsGateway = {
    async CreateJob(body: CreateJobBody): Promise<CreateJobSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Post<CreateJobSuccessResponse, CreateJobErrorResponse>(
            `${BASE_URL}/admin/news/jobs`,
            body,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async EditJob(id: string, body: EditJobBody): Promise<EditJobSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Patch<EditJobSuccessResponse, EditJobErrorResponse>(
            `${BASE_URL}/admin/news/jobs/${id}`,
            body,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetJob(id: string): Promise<GetJobSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetJobSuccessResponse, GetJobErrorResponse>(
            `${BASE_URL}/admin/news/jobs/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async GetJobs(query: GetJobsQueryParams): Promise<GetJobsSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetJobsSuccessResponse, GetJobsErrorResponse>(
            `${BASE_URL}/admin/news/jobs`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async DeleteJob(id: string): Promise<void> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Delete<void, DeleteJobErrorResponse>(
            `${BASE_URL}/admin/news/jobs/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },
};

export { JobsGateway };
