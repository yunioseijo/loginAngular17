/**
 * AdminApi
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.0.7
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface DriveTdcUpdatedEvent { 
    driveId?: number;
    tdcFreeSectors?: number;
    tdcTotalSectors?: number;
    tdcBadSectors?: number;
    lastTdcConfirmationDate?: string | null;
}

