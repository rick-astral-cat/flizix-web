/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_CreateUserRequest } from '../models/api_CreateUserRequest';
import type { api_UserResponse } from '../models/api_UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get profile
     * Get userdata using JWT on cookie.
     * @returns api_UserResponse OK
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<api_UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me',
            errors: {
                401: `Not authorized`,
            },
        });
    }
    /**
     * Create new user
     * Register new user on DB with name, email and passkey ID.
     * @param user User data
     * @returns api_UserResponse Created
     * @throws ApiError
     */
    public static postUsers(
        user: api_CreateUserRequest,
    ): CancelablePromise<api_UserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users',
            body: user,
            errors: {
                400: `Invalid JSON`,
                500: `Internal Server Error`,
            },
        });
    }
}
