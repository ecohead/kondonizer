import { LitElement } from "lit";
import { ZodSchema } from 'zod';
import { NotificationTypes } from './enums/notification_types.js';
import DefaultTranslation from './translations/en.js';
/**
 * Notifications.
 */
export interface NotificationEvent {
    type: NotificationTypes;
    message: string;
}
export interface Notification extends NotificationEvent {
    uuid: string;
}
/**
 * Media list layout.
 */
export declare type GalleryLayout = 'grid' | 'list';
export declare type SortFilter = {
    field: 'filename' | 'uploadedAt';
    order: 'ASC' | 'DESC';
};
export declare type DropdownStates = {
    filter: boolean;
    sort: boolean;
    translate: boolean;
};
export declare type GalleryArrangements = {
    filters: string[];
    sorter: SortFilter;
    search?: string;
};
/**
 * Translation file shape.
 */
export declare type TranslationKeys = typeof DefaultTranslation;
/**
 * Media value object shape.
 */
export declare type Media = {
    id: string;
    filename: string;
    filesize?: string;
    filetype: string;
    filepath: string;
    altText?: string;
    legend?: string;
    uploadedAt: string;
    uploadedBy?: string;
};
/**
 * API endpoints definitions.
 */
export declare type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export declare type APIParams = {
    [key: string]: string;
};
export declare type APIEndpoint = {
    uri: string;
    method: HTTPMethod;
    statusCodeOk: number;
    fetchOptions?: Omit<RequestInit, 'method' | 'body'>;
};
export declare type APIEndpoints = {
    list: APIEndpoint;
    upload?: APIEndpoint;
    show: APIEndpoint;
    update?: APIEndpoint;
    delete?: APIEndpoint;
};
export declare type ResponseData<T> = {
    data: T;
};
/**
 * Selection modification types.
 */
export declare type QueueUpdate = {
    operation: 'insert' | 'delete' | 'replace';
    media: Media;
};
/**
 * Media placeholder configuration.
 */
export declare type Placeholder = {
    filetypes: string[];
    svg?: string;
    imageUrl?: string;
};
/**
 * Exported configuration options.
 */
export declare type IdentifierFormat = 'string' | 'number';
export interface InternalConfigOptions {
    identifier: string;
}
export interface ConfigOptions {
    multiple?: boolean;
    selectionConstraints?: {
        min?: number;
        max?: number;
    };
    endpoints?: APIEndpoints;
    validators?: {
        editSchema?: () => ZodSchema;
    };
    translations?: Partial<Record<string, TranslationKeys>>;
    activeLang?: string;
    identifierType?: IdentifierFormat;
    customPlaceholders?: Array<Placeholder>;
    acceptedFiletypes?: Array<string>;
    defaultArrangements?: GalleryArrangements;
    defaultGalleryLayout?: GalleryLayout;
    builtinPreviews?: string[];
}
export interface KondonizerOptions extends ConfigOptions, InternalConfigOptions {
}
/**
 * kondoupdate event's shape.
 */
export declare type KondonizerExport = {
    identifier: string;
    selection: Array<string | number>;
};
/**
 * API props.
 */
export declare type ShowMediaProps = {
    el: LitElement;
    params?: APIParams;
    config?: KondonizerOptions;
};
export declare type ListMediasProps = {
    el: LitElement;
    params?: APIParams;
    config?: KondonizerOptions;
};
export declare type UpdateMediaFields = {
    legend?: string;
    alt_text?: string;
};
export declare type UpdateMediaProps = {
    el: LitElement;
    formData: UpdateMediaFields;
    media?: Media;
    config?: KondonizerOptions;
    params?: APIParams;
};
export declare type DeleteMediaProps = {
    el: LitElement;
    media?: Media;
    config?: KondonizerOptions;
    params?: APIParams;
};
export declare type UploadMediaProps = {
    el: LitElement;
    file: File;
    config?: KondonizerOptions;
    params?: APIParams;
};
