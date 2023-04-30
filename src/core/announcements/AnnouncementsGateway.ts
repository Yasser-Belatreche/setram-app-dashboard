import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';
import { GatewayException } from '../GatewayException';

import { CreateAnnouncementBody } from './api-contract/create-announcement/CreateAnnouncementBody';
import { CreateAnnouncementSuccessResponse } from './api-contract/create-announcement/CreateAnnouncementSuccessResponse';

import { EditAnnouncementBody } from './api-contract/edit-announcement/EditAnnouncementBody';
import { EditAnnouncementSuccessResponse } from './api-contract/edit-announcement/EditAnnouncementSuccessResponse';
import { CreateAnnouncementErrorResponse } from './api-contract/create-announcement/CreateAnnouncementErrorResponse';

import { GetAnnouncementErrorResponse } from './api-contract/get-announcement/GetAnnouncementErrorResponse';
import { EditAnnouncementErrorResponse } from './api-contract/edit-announcement/EditAnnouncementErrorResponse';
import { GetAnnouncementSuccessResponse } from './api-contract/get-announcement/GetAnnouncementSuccessResponse';

import { GetAnnouncementsQueryParams } from './api-contract/get-announcements/GetAnnouncementsQueryParams';
import { GetAnnouncementsErrorResponse } from './api-contract/get-announcements/GetAnnouncementsErrorResponse';
import { GetAnnouncementsSuccessResponse } from './api-contract/get-announcements/GetAnnouncementsSuccessResponse';

import { DeleteAnnouncementErrorResponse } from './api-contract/delete-announcement/DeleteAnnouncementErrorResponse';

import { AuthGateway } from '../auth/AuthGateway';

const AnnouncementsGateway = {
    async CreateAnnouncement(
        body: CreateAnnouncementBody,
    ): Promise<CreateAnnouncementSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Post<
            CreateAnnouncementSuccessResponse,
            CreateAnnouncementErrorResponse
        >(`${BASE_URL}/admin/news/announcements`, body, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async EditAnnouncement(
        id: string,
        body: EditAnnouncementBody,
    ): Promise<EditAnnouncementSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Patch<
            EditAnnouncementSuccessResponse,
            EditAnnouncementErrorResponse
        >(`${BASE_URL}/admin/news/announcements/${id}`, body, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetAnnouncement(id: string): Promise<GetAnnouncementSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<
            GetAnnouncementSuccessResponse,
            GetAnnouncementErrorResponse
        >(`${BASE_URL}/admin/news/announcements/${id}`, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async GetAnnouncements(
        query: GetAnnouncementsQueryParams,
    ): Promise<GetAnnouncementsSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<
            GetAnnouncementsSuccessResponse,
            GetAnnouncementsErrorResponse
        >(`${BASE_URL}/admin/news/announcements`, { Authorization: token });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async DeleteAnnouncement(id: string): Promise<void> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Delete<void, DeleteAnnouncementErrorResponse>(
            `${BASE_URL}/admin/news/announcements/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },
};

export { AnnouncementsGateway };
