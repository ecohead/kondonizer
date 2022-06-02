import { LitElement } from 'lit';
import { GalleryLayout, Media, NotificationEvent, QueueUpdate, SortFilter } from '../types.js';
export default class EventEmitter {
    static generalUpdate(medias: Media[], identifier: string, el: LitElement): void;
    static removeFromSelection(media: Media, el: LitElement): void;
    static closeModal(el: LitElement): void;
    static refreshList(el: LitElement): void;
    static confirmSelection(el: LitElement): void;
    static editMedia(media: Media, el: LitElement): void;
    static saveMedia(media: Media, el: LitElement): void;
    static hideMediaInEdition(el: LitElement): void;
    static deleteMedia(media: Media, el: LitElement): void;
    static uploadedMedia(media: Media, el: LitElement): void;
    static mediaSelected(media: Media, el: LitElement, operation: QueueUpdate['operation']): void;
    static addNotification(notification: NotificationEvent, el: LitElement): void;
    static removeNotification(uuid: string, el: LitElement): void;
    static filterList(filters: string[], el: LitElement): void;
    static suppressListFilters(el: LitElement): void;
    static changeGalleryLayout(type: GalleryLayout, el: LitElement): void;
    static sortList(sort: SortFilter, el: LitElement): void;
    static submitSearch(query: string, el: LitElement): void;
    static updateActiveLang(lang: string, el: LitElement): void;
}
