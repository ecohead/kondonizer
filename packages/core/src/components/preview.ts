import { html, LitElement, nothing } from "lit";
import { customElement, property } from 'lit/decorators.js';
import EventEmitter from '../helpers/events.js';
import { renderThumbnail } from "../helpers/media.js";
import { usePreviewStyles } from "../helpers/theme.js";
import Translator from '../helpers/translator.js';
import { KondonizerOptions, Media } from "../types.js";

@customElement('kondo-preview')
export default class Preview extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = usePreviewStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @property({
    type: Array
  })
  private medias: Array<Media> = [];

  @property({
    type: Object
  })
  config?: KondonizerOptions;

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  private _handleRemove(media: Media) {
    EventEmitter.removeFromSelection(media, this);
  }

  private async _handleCopy(media: Media) {
    await navigator.clipboard.writeText(media.filepath);
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    if (this.medias.length === 0) {
      return html`
        <div class="kondo-previewContainer --empty">
          <b>${Translator.translate('ui.preview.no_media_selected')}</b>
        </div>
      `;
    }

    return html`
      <div class="kondo-previewContainer">
        ${this.medias.map((media: Media) => html`
          <article class="kondo-previewItem" tabindex="0">
            ${this.config && this.config.customPlaceholders ? renderThumbnail({
              media,
              placeholders: this.config.customPlaceholders,
              cssClasses: {
                thumbnail: 'kondo-previewItem_thumbnail',
                name: 'kondo-previewItem_thumbnailName'
              },
              previewList: this.config.builtinPreviews || []
            }) : nothing}
            <button type="button" class="kondo-previewItem_actions --remove" title="${Translator.translate('ui.preview.remove_from_selection')}" @click=${() => this._handleRemove(media)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
              </svg>
            </button>
            <button type="button" class="kondo-previewItem_actions --copy" title="${Translator.translate('ui.common.copy_link')}" @click=${() => this._handleCopy(media)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </button>
          </article>
        `)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-preview': Preview;
  }
}
