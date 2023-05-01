import { LoginBody } from './api-contract/login/LoginBody';

import { BASE_URL } from '../BaseUrl';
import { RestClient } from '../RestClient';

import { GatewayException } from '../GatewayException';

import { LoginErrorResponse } from './api-contract/login/LoginErrorResponse';
import { LoginSuccessResponse } from './api-contract/login/LoginSuccessResponse';

const AuthGateway = {
    async Login(body: LoginBody): Promise<void> {
        const result = await RestClient.Post<LoginSuccessResponse, LoginErrorResponse>(
            `${BASE_URL}/auth/login`,
            body,
            {
                'Content-Type': 'application/json',
            },
        );

        if (!result.success()) {
            const { message } = result.error();
            throw new GatewayException(typeof message === 'string' ? message : message.join(', '));
        }

        const { accessToken } = result.unpack();

        localStorage.setItem('token', `Bearer ${accessToken}`);
    },

    GetLocalToken(): string | null {
        return localStorage.getItem('token');
    },

    Logout(): void {
        localStorage.clear();
    },

    IsLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    },
};

export { AuthGateway };
