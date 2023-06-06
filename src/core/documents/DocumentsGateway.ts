import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';
import { GatewayException } from '../GatewayException';

import { CreateDocumentBody } from './api-contract/create-document/CreateDocumentBody';
import { CreateDocumentErrorResponse } from './api-contract/create-document/CreateDocumentErrorResponse';
import { CreateDocumentSuccessResponse } from './api-contract/create-document/CreateDocumentSuccessResponse';

import { EditDocumentBody } from './api-contract/edit-document/EditDocumentBody';
import { EditDocumentErrorResponse } from './api-contract/edit-document/EditDocumentErrorResponse';
import { EditDocumentSuccessResponse } from './api-contract/edit-document/EditDocumentSuccessResponse';

import { GetDocumentErrorResponse } from './api-contract/get-document/GetDocumentErrorResponse';
import { GetDocumentSuccessResponse } from './api-contract/get-document/GetDocumentSuccessResponse';

import { GetDocumentsQueryParams } from './api-contract/get-documents/GetDocumentsQueryParams';
import { GetDocumentsErrorResponse } from './api-contract/get-documents/GetDocumentsErrorResponse';
import { GetDocumentsSuccessResponse } from './api-contract/get-documents/GetDocumentsSuccessResponse';

import { DeleteDocumentErrorResponse } from './api-contract/delete-document/DeleteDocumentErrorResponse';

import { AuthGateway } from '../auth/AuthGateway';

const DocumentsGateway = {
    async CreateDocument(body: CreateDocumentBody): Promise<CreateDocumentSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const FD = new FormData();

        for (const [key, value] of Object.entries(body)) {
            if (value instanceof Array) value.forEach(v => FD.append(`${key}[]`, v));
            else FD.append(key, value);
        }

        const result = await RestClient.Post<
            CreateDocumentSuccessResponse,
            CreateDocumentErrorResponse
        >(`${BASE_URL}/admin/documents/upload`, FD, {
            Authorization: token,
        });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async EditDocument(id: string, body: EditDocumentBody): Promise<EditDocumentSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const FD = new FormData();

        for (const [key, value] of Object.entries(body)) {
            if (value instanceof Array) value.forEach(v => FD.append(`${key}[]`, v));
            else FD.append(key, value);
        }

        const result = await RestClient.Patch<
            EditDocumentSuccessResponse,
            EditDocumentErrorResponse
        >(`${BASE_URL}/admin/documents/${id}`, FD, {
            Authorization: token,
        });

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        return result.unpack();
    },

    async GetDocument(id: string): Promise<GetDocumentSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetDocumentSuccessResponse, GetDocumentErrorResponse>(
            `${BASE_URL}/admin/documents/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    GetDocumentFileLink(id: string): string {
        return `${BASE_URL}/admin/documents/${id}/file`;
    },

    async GetDocuments(query: GetDocumentsQueryParams): Promise<GetDocumentsSuccessResponse> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Get<GetDocumentsSuccessResponse, GetDocumentsErrorResponse>(
            `${BASE_URL}/admin/documents?page=${query.page}&perPage=${query.perPage}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },

    async DeleteDocument(id: string): Promise<void> {
        const token = AuthGateway.GetLocalToken();

        if (!token) throw new GatewayException('you have no token');

        const result = await RestClient.Delete<void, DeleteDocumentErrorResponse>(
            `${BASE_URL}/admin/documents/${id}`,
            { Authorization: token },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(message);
        }

        return result.unpack();
    },
};

export { DocumentsGateway };
