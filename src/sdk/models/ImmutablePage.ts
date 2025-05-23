/* tslint:disable */
/* eslint-disable */
/**
 * Jstl.ink API
 * Jstl.ink gives users the ability to easily create simple pages containing for  them relevant links and their social media profiles
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Link } from './Link';
import {
    LinkFromJSON,
    LinkFromJSONTyped,
    LinkToJSON,
    LinkToJSONTyped,
} from './Link';

/**
 * 
 * @export
 * @interface ImmutablePage
 */
export interface ImmutablePage {
    /**
     * username user page
     * @type {string}
     * @memberof ImmutablePage
     */
    name?: string;
    /**
     * biography for user page
     * @type {string}
     * @memberof ImmutablePage
     */
    bio?: string;
    /**
     * url for image
     * @type {string}
     * @memberof ImmutablePage
     */
    img?: string;
    /**
     * links for social media profiles
     * @type {Array<Link>}
     * @memberof ImmutablePage
     */
    socialLinks?: Array<Link>;
    /**
     * custom definable links
     * @type {Array<Link>}
     * @memberof ImmutablePage
     */
    links?: Array<Link>;
}

/**
 * Check if a given object implements the ImmutablePage interface.
 */
export function instanceOfImmutablePage(value: object): value is ImmutablePage {
    return true;
}

export function ImmutablePageFromJSON(json: any): ImmutablePage {
    return ImmutablePageFromJSONTyped(json, false);
}

export function ImmutablePageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ImmutablePage {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'] == null ? undefined : json['name'],
        'bio': json['bio'] == null ? undefined : json['bio'],
        'img': json['img'] == null ? undefined : json['img'],
        'socialLinks': json['socialLinks'] == null ? undefined : ((json['socialLinks'] as Array<any>).map(LinkFromJSON)),
        'links': json['links'] == null ? undefined : ((json['links'] as Array<any>).map(LinkFromJSON)),
    };
}

export function ImmutablePageToJSON(json: any): ImmutablePage {
    return ImmutablePageToJSONTyped(json, false);
}

export function ImmutablePageToJSONTyped(value?: ImmutablePage | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'name': value['name'],
        'bio': value['bio'],
        'img': value['img'],
        'socialLinks': value['socialLinks'] == null ? undefined : ((value['socialLinks'] as Array<any>).map(LinkToJSON)),
        'links': value['links'] == null ? undefined : ((value['links'] as Array<any>).map(LinkToJSON)),
    };
}

