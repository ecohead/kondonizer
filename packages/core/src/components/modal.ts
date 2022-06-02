import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import API from '../helpers/api.js';
import EventEmitter from '../helpers/events.js';
import { useModalStyles } from "../helpers/theme.js";
import {
  GalleryArrangements,
  GalleryLayout,
  KondonizerOptions,
  Media, Notification,
  SortFilter
} from "../types.js";
import './modal_footer.js';
import './modal_header.js';
import './modal_list.js';
import './modal_sidebar.js';
import './notifications.js';

@customElement('kondo-modal')
export default class Modal extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useModalStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @state()
  private mediaGallery: Array<Media> = [];

  @state()
  private displayedGallery: Array<Media> = [];

  @state()
  private mediaTypes: string[] = [];

  @state()
  private currentEditedMedia?: Media;

  /**
   * Store of all notifications emitted by the children components.
   *
   * In order to reduce the **complexity** and the number of event data transmitted
   * by other subcomponents, we store all notifications here before dispatching
   * to the dedicated notifications component.
   */
  @state()
  private notifications: Array<Notification> = [];

  @state()
  private activeArrangements: GalleryArrangements & { layout?: GalleryLayout } = {
    filters: ['all'],
    sorter: { field: 'uploadedAt', order: 'DESC' },
    layout: 'grid'
  };

  @property({
    type: Object,
  })
  private config?: KondonizerOptions;

  @property({
    type: Array
  })
  private selectedMedias: Array<Media> = [];

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // Component lifecycle hooks.
  // -----------------------------------------------------------------------

  override async connectedCallback() {
    super.connectedCallback();

    if (this.config?.defaultArrangements) {
      this.activeArrangements = { ...this.config.defaultArrangements };
    }

    if (this.config?.defaultGalleryLayout) {
      this.activeArrangements = { ...this.activeArrangements, layout: this.config.defaultGalleryLayout };
    }

    this.mediaGallery = await API.getList({
      el: this,
      config: this.config
    }) || [];

    this.displayedGallery = [...this._computeDisplayedMedias(this.config?.defaultArrangements?.search)];
    this._refreshMediaTypes();
  }

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  /** Add notification. */
  private _addNotificationToQueue(event: CustomEvent<Notification>): void {
    event.stopPropagation();
    this.notifications = [...this.notifications, event.detail];
  }

  /** Remove notification. */
  private _removeNotificationFromQueue(event: CustomEvent<string>): void {
    event.stopPropagation();
    this.notifications = this.notifications.filter((n) => n.uuid !== event.detail);
  }

  private async _refreshMediaList() {
    this.mediaGallery = await API.getList({
      el: this,
      config: this.config
    }) || [];

    this.displayedGallery = [...this._computeDisplayedMedias()]
    this._refreshMediaTypes();
  }

  private _refreshMediaTypes(): void {
    this.mediaTypes = this.mediaGallery.reduce((acc: string[], media: Media) => {
      if (acc.find((type) => type === media.filetype)) {
        return acc;
      }

      acc.push(media.filetype);
      return acc;
    }, []);
  }

  private _removeMediaFromList({ detail }: CustomEvent<Media>) {
    this.mediaGallery = this.mediaGallery.filter((media) => media.id !== detail.id);
    this.displayedGallery = [...this._computeDisplayedMedias()]

    EventEmitter.removeFromSelection(detail, this);
  }

  private _addMediaToList({ detail }: CustomEvent<Media>) {
    this.mediaGallery = [detail, ...this.mediaGallery];
    this.displayedGallery = [...this._computeDisplayedMedias()]
  }

  private _setMediaInSidebar(event: CustomEvent<Media>) {
    event.stopPropagation();
    this.currentEditedMedia = event.detail;
  }

  private _saveMediaDetails(event: CustomEvent<Media>) {
    this.mediaGallery = this.mediaGallery.map(media => {
      if (media.id === event.detail.id) {
        return {
          ...media,
          legend: event.detail.legend,
          altText: event.detail.altText,
        };
      }

      return media;
    });

    this.displayedGallery = [...this._computeDisplayedMedias()]
  }

  private _hideMedia(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.currentEditedMedia = undefined;
  }

  private _filterGallery(event: CustomEvent<string[]>): void {
    event.stopPropagation();
    this.activeArrangements = { ...this.activeArrangements, filters: event.detail };
    this.displayedGallery = [...this._computeDisplayedMedias()]
  }

  private _sortGallery(event: CustomEvent<SortFilter>): void {
    event.stopPropagation();
    this.activeArrangements = { ...this.activeArrangements, sorter: event.detail };
    this.displayedGallery = [...this._computeDisplayedMedias()];
  }

  private _suppressGalleryFilters(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.activeArrangements = { ...this.activeArrangements, filters: ['all'] };
    this.displayedGallery = [...this.mediaGallery];
  }

  private _updateGalleryLayout(event: CustomEvent<GalleryLayout>): void {
    event.stopPropagation();
    this.activeArrangements = { ...this.activeArrangements, layout: event.detail };
  }

  private _searchInGallery(event: CustomEvent<string>): void {
    event.stopPropagation();
    this.displayedGallery = [...this._computeDisplayedMedias(event.detail)];
  }

  private _computeDisplayedMedias(searchQuery?: string) {
    let filtered;
    const { filters: filetypes, sorter: sort } = this.activeArrangements;

    if (filetypes.length === 1 && filetypes[0] === 'all' && !searchQuery) {
      filtered = [...this.mediaGallery];
    } else if (filetypes.length === 1 && filetypes[0] === 'all' && searchQuery) {
      filtered = this.mediaGallery.filter(media => media.filename.includes(searchQuery));
    } else if (searchQuery) {
      filtered = this.mediaGallery.filter(media => filetypes.find(type => type === media.filetype) && media.filename.includes(searchQuery));
    } else {
      filtered = this.mediaGallery.filter(media => filetypes.find(type => type === media.filetype));
    }

    return this._sortMedias(filtered, sort);
  }

  private _sortMedias(arr: Media[], sort: SortFilter) {
    const { field, order } = sort;

    if (field === 'filename' && order === 'ASC') {
      return arr.sort((a: Media, b: Media) => a.filename.localeCompare(b.filename));
    }

    if (field === 'filename' && order === 'DESC') {
      return arr.sort((a: Media, b: Media) => {
        const c = a.filename.localeCompare(b.filename);

        if (c === 1) return -1;
        if (c === -1) return 1;
        return 0;
      });
    }

    if (field === 'uploadedAt' && order === 'ASC') {
      return arr.sort((a: Media, b: Media) => {
        const dateA = new Date(a.uploadedAt).getTime();
        const dateB = new Date(b.uploadedAt).getTime();

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        return 0;
      });
    }

    if (field === 'uploadedAt' && order === 'DESC') {
      return arr.sort((a: Media, b: Media) => {
        const dateA = new Date(a.uploadedAt).getTime();
        const dateB = new Date(b.uploadedAt).getTime();

        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;

        return 0;
      });
    }

    return arr;
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    return html`
      <div class="kondoModal_container">
        <div class="kondoModal_overlay"></div>
        <article class="kondoModal_modal${this.config?.endpoints?.upload === undefined && this.config?.endpoints?.update === undefined ? ' --noSidebar' : ''}">
          <kondo-modal-header
            .mediaTypes=${this.mediaTypes}
            .activeArrangements=${this.activeArrangements}
            .activeLang=${this.activeLang}
            @kondo:list:refresh=${this._refreshMediaList}
            @kondo:list:filter=${this._filterGallery}
            @kondo:list:sort=${this._sortGallery}
            @kondo:list:all=${this._suppressGalleryFilters}
            @kondo:list:update-layout=${this._updateGalleryLayout}
            @kondo:list:search=${this._searchInGallery}
          ></kondo-modal-header>

          <kondo-modal-list
            .medias=${this.displayedGallery}
            .config=${this.config}
            .selection=${this.selectedMedias}
            .galleryLayout=${this.activeArrangements.layout}
            .activeLang=${this.activeLang}
            @kondo:media:show=${this._setMediaInSidebar}
            @kondo:notifications:add=${this._addNotificationToQueue}
          ></kondo-modal-list>

          <kondo-modal-sidebar
            .config=${this.config}
            .mediaToEdit=${this.currentEditedMedia}
            .activeLang=${this.activeLang}
            @kondo:media:delete=${this._removeMediaFromList}
            @kondo:media:upload=${this._addMediaToList}
            @kondo:media:updated=${this._saveMediaDetails}
            @kondo:media:hide=${this._hideMedia}
            @kondo:notifications:add=${this._addNotificationToQueue}
          ></kondo-modal-sidebar>

          <kondo-modal-footer
            .config=${this.config}
            .selectionCount=${this.selectedMedias.length}
            .activeLang=${this.activeLang}
          ></kondo-modal-footer>

          <kondo-notifications
            .notifications=${this.notifications}
            @kondo:notifications:remove=${this._removeNotificationFromQueue}
          ></kondo-notifications>
        </article>
      </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal': Modal;
  }
}
