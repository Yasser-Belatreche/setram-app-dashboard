import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';
import { GatewayException } from '../GatewayException';

import { CreateEventBody } from './api-contract/create-event/CreateEventBody';
import { CreateEventSuccessResponse } from './api-contract/create-event/CreateEventSuccessResponse';

import { EditEventBody } from './api-contract/edit-event/EditEventBody';
import { EditEventSuccessResponse } from './api-contract/edit-event/EditEventSuccessResponse';
import { CreateEventErrorResponse } from './api-contract/create-event/CreateEventErrorResponse';

import { GetEventErrorResponse } from './api-contract/get-event/GetEventErrorResponse';
import { EditEventErrorResponse } from './api-contract/edit-event/EditEventErrorResponse';
import { GetEventSuccessResponse } from './api-contract/get-event/GetEventSuccessResponse';

import { GetEventsQueryParams } from './api-contract/get-events/GetEventsQueryParams';
import { GetEventsErrorResponse } from './api-contract/get-events/GetEventsErrorResponse';
import { GetEventsSuccessResponse } from './api-contract/get-events/GetEventsSuccessResponse';

import { DeleteEventErrorResponse } from './api-contract/delete-event/DeleteEventErrorResponse';

import { AuthGateway } from '../auth/AuthGateway';

const EventsGateway = {
    async CreateEvent(body: CreateEventBody): Promise<CreateEventSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Post<CreateEventSuccessResponse, CreateEventErrorResponse>(
            `${BASE_URL}/admin/news/events`,
            body,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async EditEvent(id: string, body: EditEventBody): Promise<EditEventSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Patch<EditEventSuccessResponse, EditEventErrorResponse>(
            `${BASE_URL}/admin/news/events/${id}`,
            body,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetEvent(id: string): Promise<GetEventSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetEventSuccessResponse, GetEventErrorResponse>(
            `${BASE_URL}/admin/news/events/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async GetEvents(query: GetEventsQueryParams): Promise<GetEventsSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetEventsSuccessResponse, GetEventsErrorResponse>(
            `${BASE_URL}/admin/news/events`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async DeleteEvent(id: string): Promise<void> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Delete<void, DeleteEventErrorResponse>(
            `${BASE_URL}/admin/news/events/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },
};

export { EventsGateway };
