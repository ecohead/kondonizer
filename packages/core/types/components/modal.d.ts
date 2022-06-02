import { LitElement } from 'lit';
import './modal_footer.js';
import './modal_header.js';
import './modal_list.js';
import './modal_sidebar.js';
import './notifications.js';
export default class Modal extends LitElement {
    static styles: import("lit").CSSResult[];
    private mediaGallery;
    private displayedGallery;
    private mediaTypes;
    private currentEditedMedia?;
    /**
     * Store of all notifications emitted by the children components.
     *
     * In order to reduce the **complexity** and the number of event data transmitted
     * by other subcomponents, we store all notifications here before dispatching
     * to the dedicated notifications component.
     */
    private notifications;
    private activeArrangements;
    private config?;
    private selectedMedias;
    activeLang?: string;
    connectedCallback(): Promise<void>;
    /** Add notification. */
    private _addNotificationToQueue;
    /** Remove notification. */
    private _removeNotificationFromQueue;
    private _refreshMediaList;
    private _refreshMediaTypes;
    private _removeMediaFromList;
    private _addMediaToList;
    private _setMediaInSidebar;
    private _saveMediaDetails;
    private _hideMedia;
    private _filterGallery;
    private _sortGallery;
    private _suppressGalleryFilters;
    private _updateGalleryLayout;
    private _searchInGallery;
    private _computeDisplayedMedias;
    private _sortMedias;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal': Modal;
    }
}
