/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_CardResponse } from '../models/api_CardResponse';
import type { api_CreateCardRequest } from '../models/api_CreateCardRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CardsService {
    /**
     * List all cards
     * Get all credit and debit cards for the authenticated user
     * @returns api_CardResponse OK
     * @throws ApiError
     */
    public static getCards(): CancelablePromise<Array<api_CardResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cards',
            errors: {
                401: `Not authorized`,
            },
        });
    }
    /**
     * Create a new card
     * Create a credit or debit card for the authenticated user
     * @param card Card data
     * @returns api_CardResponse Created
     * @throws ApiError
     */
    public static postCards(
        card: api_CreateCardRequest,
    ): CancelablePromise<api_CardResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cards',
            body: card,
            errors: {
                400: `Invalid request`,
            },
        });
    }
}
