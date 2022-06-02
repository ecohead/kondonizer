import { LitElement } from 'lit';
import { nanoid } from 'nanoid';
import {
  GalleryLayout, KondonizerExport, Media, Notification, NotificationEvent, QueueUpdate, SortFilter
} from '../types.js';

export default class EventEmitter {
  public static generalUpdate(medias: Media[], identifier: string, el: LitElement): void {
    el.dispatchEvent(
      new CustomEvent<KondonizerExport>(
        'kondoupdate',
        {
          detail: {
            identifier,
            selection: medias.reduce((acc: string[], cur: Media) => {
              acc.push(cur.id);
              return acc;
            }, [])
          },
          composed: true,
          cancelable: true,
          bubbles: true
        }
      )
    );
  }

  public static removeFromSelection(media: Media, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<QueueUpdate>(
        'kondo:queue:update',
        {
          detail: {
            operation: 'delete',
            media
          },
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static closeModal(el: LitElement) {
    el.dispatchEvent(
      new CustomEvent(
        'kondo:close',
        {
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static refreshList(el: LitElement) {
    el.dispatchEvent(
      new CustomEvent(
        'kondo:list:refresh',
        {
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static confirmSelection(el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<void>(
        'kondo:selection:confirm',
        {
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static editMedia(media: Media, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<Media>(
        'kondo:media:show',
        {
          detail: media,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static saveMedia(media: Media, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<Media>(
        'kondo:media:updated',
        {
          detail: media,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static hideMediaInEdition(el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<void>(
        'kondo:media:hide',
        {
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static deleteMedia(media: Media, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<Media>(
        'kondo:media:delete',
        {
          detail: media,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static uploadedMedia(media: Media, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<Media>(
        'kondo:media:upload',
        {
          detail: media,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static mediaSelected(
    media: Media,
    el: LitElement,
    operation: QueueUpdate['operation']
  ) {
    el.dispatchEvent(
      new CustomEvent<QueueUpdate>(
        'kondo:queue:update',
        {
          detail: {
            media,
            operation
          },
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static addNotification(notification: NotificationEvent, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<Notification>(
        'kondo:notifications:add',
        {
          detail: {
            ...notification,
            uuid: nanoid()
          },
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static removeNotification(uuid: string, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<string>(
        'kondo:notifications:remove',
        {
          detail: uuid,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static filterList(filters: string[], el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<string[]>(
        'kondo:list:filter',
        {
          detail: filters,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static suppressListFilters(el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<void>(
        'kondo:list:all',
        {
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static changeGalleryLayout(type: GalleryLayout, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<GalleryLayout>(
        'kondo:list:update-layout',
        {
          detail: type,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static sortList(sort: SortFilter, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<SortFilter>(
        'kondo:list:sort',
        {
          detail: sort,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static submitSearch(query: string, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<string>(
        'kondo:list:search',
        {
          detail: query,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }

  public static updateActiveLang(lang: string, el: LitElement) {
    el.dispatchEvent(
      new CustomEvent<string>(
        'kondo:lang:update',
        {
          detail: lang,
          bubbles: true,
          composed: true,
          cancelable: true
        }
      )
    );
  }
}
