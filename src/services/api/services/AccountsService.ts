/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { api_AccountResponse } from '../models/api_AccountResponse';
import type { api_CreateAccountRequest } from '../models/api_CreateAccountRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountsService {
  /**
   * List all bank accounts
   * Get all bank and cash accounts for the authenticated user
   * @returns api_AccountResponse OK
   * @throws ApiError
   */
  public static getAccounts(): CancelablePromise<Array<api_AccountResponse>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/accounts',
      errors: {
        401: `Unauthorized`,
      },
    });
  }
  /**
   * Create a new bank account
   * Create a bank or cash account for the authenticated user
   * @param account Account data
   * @returns api_AccountResponse Created
   * @throws ApiError
   */
  public static postAccounts(
    account: api_CreateAccountRequest
  ): CancelablePromise<api_AccountResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/accounts',
      body: account,
      errors: {
        400: `Invalid request`,
        401: `Unauthorized`,
      },
    });
  }
  /**
   * Delete a bank account
   * Soft delete a specific bank account for the authenticated user
   * @param id Account ID
   * @returns string OK
   * @throws ApiError
   */
  public static deleteAccounts(id: number): CancelablePromise<Record<string, string>> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/accounts/{id}',
      path: {
        id: id,
      },
      errors: {
        400: `Invalid ID`,
        401: `Unauthorized`,
      },
    });
  }
}
