/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_TelegramAuthRequest } from '../models/internal_api_TelegramAuthRequest';
import type { internal_api_UserResponse } from '../models/internal_api_UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
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
     * @returns internal_api_UserResponse OK
     * @throws ApiError
     */
    public static postAuthTelegram(
        data: internal_api_TelegramAuthRequest,
    ): CancelablePromise<internal_api_UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/telegram',
            body: data,
        });
    }
}
