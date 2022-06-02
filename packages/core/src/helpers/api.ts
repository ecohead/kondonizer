import { NotificationTypes } from '../enums/notification_types.js';
import {
  APIParams, DeleteMediaProps, ListMediasProps, Media,
  ResponseData, ShowMediaProps, UpdateMediaProps, UploadMediaProps
} from "../types.js";
import EventEmitter from './events.js';
import Notifier from './notifier.js';
import Translator from './translator.js';


export default class API {
  private static generateApiEndpoint(uri: string, params?: APIParams): string {
    if (!params) return uri;

    let builtUri = uri;

    for (const [key, value] of Object.entries(params)) {
      builtUri = builtUri.replace(new RegExp(`%${key}%`, 'g'), value);
    }

    return builtUri;
  }

  public static async getMedia({ el, params, config }: ShowMediaProps): Promise<Media | null> {
    /** Abort if no endpoint is specified in attributes. */
    if (!config || !config.endpoints || !config.endpoints.show) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.no_endpoint_specified', { action: 'show' }),
      }, el);

      return null;
    }

    const response = await fetch(
      API.generateApiEndpoint(config.endpoints.show.uri, params),
      {
        ...config.endpoints.show.fetchOptions,
        method: config.endpoints.show.method,
        headers: {
          'Accept': 'application/json',
          ...config.endpoints.show.fetchOptions?.headers
        },
      }
    );

    const json: ResponseData<Media> = await response.json();

    /** Notify an empty or bad response. */
    if (response.status !== config.endpoints.show.statusCodeOk) {
      Notifier.notify({
        type: NotificationTypes.WARNING,
        message: Translator.translate('api_requests.common.response_status_unexpected'),
      }, el);

      return null;
    }

    return json.data || null;
  }

  public static async getList({ el, params, config }: ListMediasProps): Promise<Array<Media> | null> {
    if (!config || !config.endpoints || !config.endpoints.list) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.no_endpoint_specified', { action: 'list' }),
      }, el);

      return null;
    }

    const response = await fetch(
      API.generateApiEndpoint(config.endpoints.list.uri, params),
      {
        ...config.endpoints.list.fetchOptions,
        method: config.endpoints.list.method,
        headers: {
          'Accept': 'application/json',
          ...config.endpoints.list.fetchOptions?.headers
        },
      }
    );

    const json: ResponseData<Media[]> = await response.json();

    if (response.status !== config.endpoints.list.statusCodeOk) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.response_status_unexpected'),
      }, el);

      return null;
    }

    return json.data;
  }

  public static async updateMedia({ el, media, config, formData, params }: UpdateMediaProps): Promise<Media | null> {
    if (!media || !config || !config.endpoints || !config.endpoints.update) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.no_endpoint_specified', { action: 'update' }),
      }, el);

      return null;
    }

    const requestBody: { legend?: string, alt_text?: string } = {};

    if (formData.legend) {
      requestBody.legend = formData.legend
    }

    if (formData.alt_text) {
      requestBody.alt_text = formData.alt_text
    }

    const response = await fetch(
      API.generateApiEndpoint(config.endpoints.update.uri, params),
      {
        ...config.endpoints.update.fetchOptions,
        method: config.endpoints.update.method,
        body: JSON.stringify(requestBody),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...config.endpoints.update.fetchOptions?.headers
        },
      }
    );

    if (response.status !== config.endpoints.update.statusCodeOk) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.response_status_unexpected'),
      }, el);

      return null;
    }

    EventEmitter.addNotification({
      type: NotificationTypes.SUCCESS,
      message: Translator.translate('api_requests.common.update_success'),
    }, el);

    return {
      ...media,
      legend: formData.legend ?? media.legend,
      altText: formData.alt_text ?? media.altText,
    }
  }

  public static async deleteMedia({ el, media, config, params }: DeleteMediaProps): Promise<boolean> {
    if (!media || !config || !config.endpoints || !config.endpoints.delete) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.no_endpoint_specified', { action: 'delete' }),
      }, el);

      return false;
    }

    const response = await fetch(
      API.generateApiEndpoint(config.endpoints.delete.uri, params),
      {
        ...config.endpoints.delete.fetchOptions,
        method: config.endpoints.delete.method,
        headers: {
          'Accept': 'application/json',
          ...config.endpoints.delete.fetchOptions?.headers
        },
      }
    );

    if (response.status !== config.endpoints.delete.statusCodeOk) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.response_status_unexpected'),
      }, el);

      return false;
    }

    EventEmitter.addNotification({
      type: NotificationTypes.SUCCESS,
      message: Translator.translate('api_requests.common.delete_success'),
    }, el);

    EventEmitter.deleteMedia(media, el);
    EventEmitter.hideMediaInEdition(el);

    return true;
  }

  public static async uploadFile({ el, file, config, params }: UploadMediaProps): Promise<Media | null> {
    if (!config || !config.endpoints || !config.endpoints.upload) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.no_endpoint_specified', { action: 'upload' }),
      }, el);

      return null;
    }

    const data = new FormData();
    data.append('media_file', file);

    const response = await fetch(
      API.generateApiEndpoint(config.endpoints.upload.uri, params),
      {
        ...config.endpoints.upload.fetchOptions,
        method: config.endpoints.upload.method,
        headers: {
          'Accept': 'application/json',
          ...config.endpoints.upload.fetchOptions?.headers
        },
        body: data,
      }
    );

    const json: ResponseData<Media> = await response.json();

    if (response.status !== config.endpoints.upload.statusCodeOk) {
      Notifier.notify({
        type: NotificationTypes.ERROR,
        message: Translator.translate('api_requests.common.response_status_unexpected'),
      }, el);

      return null;
    }

    return json.data;
  }
}
