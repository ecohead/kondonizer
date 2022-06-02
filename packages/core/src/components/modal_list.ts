import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { NotificationTypes } from "../enums/notification_types.js";
import EventEmitter from "../helpers/events.js";
import { renderThumbnail } from "../helpers/media.js";
import { useModalListStyles } from "../helpers/theme.js";
import Translator from "../helpers/translator.js";
import { GalleryLayout, KondonizerOptions, Media } from "../types.js";

@customElement('kondo-modal-list')
export default class ModalList extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useModalListStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @property({
    type: Array
  })
  medias: Array<Media> = [];

  @property({
    type: Object
  })
  config?: KondonizerOptions;

  @property({
    type: Array
  })
  selection: Array<Media> = [];

  @property({
    type: String,
  })
  private galleryLayout: GalleryLayout = 'grid';

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  private _isInitiallySelected(media: Media): boolean {
    if (!this.selection) {
      return false;
    }

    return this.selection
      .find((m: Media) => m.id === media.id) !== undefined;
  }

  private _handleSelectMedia(event: Event, media: Media) {
    const target = event.target as HTMLInputElement;

    if (!media) {
      return;
    }

    if (target.checked) {
      EventEmitter.mediaSelected(media, this, 'insert');
    } else {
      EventEmitter.mediaSelected(media, this, 'delete');
    }
  }

  private _handleEditMedia(media: Media) {
    EventEmitter.editMedia(media, this);
  }

  private _handleReplaceMedia(media: Media) {
    EventEmitter.mediaSelected(media, this, 'replace');
  }

  private _handleCopy(media: Media) {
    navigator.clipboard.writeText(media.filepath).then(() => {
      EventEmitter.addNotification({
        type: NotificationTypes.INFO,
        message: Translator.translate('ui.common.link_copied')
      }, this);
    })
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    if (this.medias.length === 0) {
      return this._renderEmptyList();
    }

    return this._renderListItems();
  }

  private _renderEmptyList() {
    return html`
      <div class="kondo-emptyList">
        <strong>${Translator.translate('ui.modal_list.no_media')}</strong>
      </div>
    `;
  }

  private _renderListItems() {
    return html`
      <form class="kondo-mediaGallery${this.galleryLayout === 'list' ? ' --listView' : ''}">
        ${repeat(
          this.medias,
          (m) => m.id,
          (media) => html`
            <div class="kondo-galleryItem">
              <label>
                ${this.config && this.config.multiple ? this._renderCheckboxVariant(media) : this._renderRadioVariant(media)}
                ${renderThumbnail({
                  media,
                  placeholders: this.config?.customPlaceholders || [],
                  cssClasses: {
                    thumbnail: 'kondo-galleryItem_thumbnail',
                    name: 'kondo-galleryItem_thumbnailName'
                  },
                  listView: this.galleryLayout === 'list',
                  previewList: this.config?.builtinPreviews || []
                })}
                <button type="button" class="kondo-galleryItem_copy" @click=${() => this._handleCopy(media)} title="${Translator.translate('ui.common.copy_link')}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                  </svg>
                </button>
                ${this.config?.endpoints?.update ? html`
                  <button type="button" class="kondo-galleryItem_edit" @click=${() => this._handleEditMedia(media)} title="${Translator.translate('ui.common.edit')}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                    </svg>
                  </button>
                ` : nothing}
              </label>
            </div>
          `
        )}
      </form>
    `;
  }

  private _renderCheckboxVariant(media: Media) {
    const initialSelection = this._isInitiallySelected(media);

    return html`
        <input
          type="checkbox"
          name="kondo-galleryItem_selection"
          class="kondo-galleryItem_selection --checkbox"
          id=${media.id}
          @change=${(e: Event) => this._handleSelectMedia(e, media)}
          ?checked=${initialSelection}
          ?disabled=${this._checkSelectionConstraints(initialSelection)}
        />
    `;
  }

  private _renderRadioVariant(media: Media) {
    return html`
        <input
          type="radio"
          name="kondo-galleryItem_selection"
          class="kondo-galleryItem_selection --radio"
          id=${media.id}
          @change=${() => this._handleReplaceMedia(media)}
          ?checked=${this._isInitiallySelected(media)}
        />
    `;
  }

  private _checkSelectionConstraints(selected: boolean): boolean {
    if (!this.config || !this.config.multiple || !this.config.selectionConstraints) {
      return false;
    }

    if (selected) {
      return false;
    }

    const { max } = this.config.selectionConstraints;
    const selectionCount = this.selection.length;

    if (max && max <= selectionCount) {
      return true;
    }

    return false;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal-list': ModalList;
  }
}
