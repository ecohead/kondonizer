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
export type GalleryLayout = 'grid'|'list';

export type SortFilter = {
  field: 'filename' | 'uploadedAt';
  order: 'ASC' | 'DESC';
}

export type DropdownStates = {
  filter: boolean;
  sort: boolean;
  translate: boolean
}

export type GalleryArrangements = {
  filters: string[];
  sorter: SortFilter;
  search?: string;
}

/**
 * Translation file shape.
 */
export type TranslationKeys = typeof DefaultTranslation;

/**
 * Media value object shape.
 */
export type Media = {
  id: string;
  filename: string;
  filesize?: string;
  filetype: string;
  filepath: string;
  altText?: string;
  legend?: string;
  uploadedAt: string;
  uploadedBy?: string;
}

/**
 * API endpoints definitions.
 */
export type HTTPMethod = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'OPTIONS'|'HEAD';

export type APIParams = {
  [key: string]: string;
}

export type APIEndpoint = {
  uri: string;
  method: HTTPMethod;
  statusCodeOk: number;
  // eslint-disable-next-line no-undef
  fetchOptions?: Omit<RequestInit, 'method'|'body'>;
}

export type APIEndpoints = {
  list: APIEndpoint;
  upload?: APIEndpoint;
  show: APIEndpoint;
  update?: APIEndpoint;
  delete?: APIEndpoint;
}

export type ResponseData<T> = {
  data: T;
}

/**
 * Selection modification types.
 */
export type QueueUpdate = {
  operation: 'insert' | 'delete' | 'replace'
  media: Media
}

/**
 * Media placeholder configuration.
 */
export type Placeholder = {
  filetypes: string[];
  svg?: string;
  imageUrl?: string;
}

/**
 * Exported configuration options.
 */
export type IdentifierFormat = 'string' | 'number';

export interface InternalConfigOptions {
  identifier: string;
}

export interface ConfigOptions {
  multiple?: boolean;
  selectionConstraints?: { min?: number, max?: number };
  endpoints?: APIEndpoints;
  validators?: {
    editSchema?: () => ZodSchema
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

export interface KondonizerOptions extends ConfigOptions, InternalConfigOptions {}

/**
 * kondoupdate event's shape.
 */
export type KondonizerExport = {
  identifier: string;
  selection: Array<string|number>;
}

/**
 * API props.
 */
export type ShowMediaProps = {
  el: LitElement;
  params?: APIParams;
  config?: KondonizerOptions;
}

export type ListMediasProps = {
  el: LitElement;
  params?: APIParams;
  config?: KondonizerOptions;
}

export type UpdateMediaFields = {
  legend?: string;
  alt_text?: string;
}

export type UpdateMediaProps = {
  el: LitElement;
  formData: UpdateMediaFields;
  media?: Media;
  config?: KondonizerOptions;
  params?: APIParams;
}

export type DeleteMediaProps = {
  el: LitElement;
  media?: Media;
  config?: KondonizerOptions;
  params?: APIParams;
}

export type UploadMediaProps = {
  el: LitElement;
  file: File;
  config?: KondonizerOptions;
  params?: APIParams;
}
