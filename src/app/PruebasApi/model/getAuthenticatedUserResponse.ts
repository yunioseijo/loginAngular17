/**
 * Identity
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.0.54
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface GetAuthenticatedUserResponse { 
    userId?: number;
    profiles?: number;
    email?: string | null;
    culture?: string | null;
    name?: string | null;
    lastName?: string | null;
    isResqtimeUser?: boolean;
    partnerSupportEmail?: string | null;
    partnerId?: number;
}

