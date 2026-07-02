/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_TelegramAuthRequest } from '../models/api_TelegramAuthRequest';
import type { api_UserResponse } from '../models/api_UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Development login
     * Omits Telegram validation and generate a JWT token for a testing user.
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthDevLogin(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/dev-login',
        });
    }
    /**
     * Close session
     * Delete cookie on browser session sending an expired cookie
     * @returns string OK
     * @throws ApiError
     */
    public static postAuthLogout(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/logout',
        });
    }
    /**
     * Login con Telegram
     * Validate Telegram hash, search or create user emitting a JWT o a cookie.
     * @param data telegram data
     * @returns api_UserResponse OK
     * @throws ApiError
     */
    public static postAuthTelegram(
        data: api_TelegramAuthRequest,
    ): CancelablePromise<api_UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/telegram',
            body: data,
        });
    }
}
