/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { internal_api_CreateUserRequest } from '../models/internal_api_CreateUserRequest';
import type { internal_api_UserResponse } from '../models/internal_api_UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Get profile
     * Get userdata using JWT on cookie.
     * @returns internal_api_UserResponse OK
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<internal_api_UserResponse> {
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
     * @returns internal_api_UserResponse Created
     * @throws ApiError
     */
    public static postUsers(
        user: internal_api_CreateUserRequest,
    ): CancelablePromise<internal_api_UserResponse> {
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
