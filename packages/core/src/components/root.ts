import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import API from "../helpers/api.js";
import EventEmitter from "../helpers/events.js";
import { useRootStyles } from "../helpers/theme.js";
import Translator from "../helpers/translator.js";
import { KondonizerOptions, Media, QueueUpdate, TranslationKeys } from "../types.js";
import './modal.js';
import './preview.js';

@customElement('kondo-root')
export default class Root extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useRootStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  /**
   * Detect if the main modal should be visible or not.
   *
   * Because we support multiple triggers for a same manager, each one
   * can manually open the selection modal with a proper link to the
   * corresponding input.
   */
  @state()
  private isOpen: boolean = false;

  @state()
  private selectedMedias: Array<Media> = [];

  /**
   * Customize the behavior of the component
   *
   * It inherits configuration from the defineConfig helper function, so
   * we can independently customize each instance of the component.
   */
  @property({
    type: Object,
  })
  private config?: KondonizerOptions;

  /**
   * Selected and displayed medias in the preview component.
   *
   * We store here the medias corresponding to the triggered input that are
   * already selected (e.g. via an existing submission) or that have been
   * selected during the modal opening time.
   */
  @property({
    type: Array,
  })
  selectedMediasIds: Array<string|number> = [];

  @property({
    type: String,
    state: true
  })
  activeLang = 'en';

  // -----------------------------------------------------------------------
  // Component lifecycle hooks.
  // -----------------------------------------------------------------------

  async connectedCallback() {
    super.connectedCallback();

    if (this.config && this.config.translations) {
      for (const [lang, dict] of Object.entries(this.config.translations)) {
        Translator.dictionaries.set(lang, dict as Partial<TranslationKeys>);
      }
    }

    if (this.activeLang) {
      Translator.activeLang = this.activeLang;
    }

    this.dataset.kondoId = this.config?.identifier || '';

    for await (const id of this.selectedMediasIds) {
      const media = await API.getMedia({
        el: this,
        config: this.config,
        params: {
          'identifier': String(id)
        }
      });

      if (media) {
        this.selectedMedias = [...this.selectedMedias, media];
      }
    }
  }

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  /** Fired when we click to close the modal. */
  private _closeModal(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.isOpen = false;
  }

  /** Fired when we trigger a queue update. */
  private _updateMediaQueue(event: CustomEvent<QueueUpdate>): void {
    event.stopPropagation();
    switch (event.detail.operation) {
      case 'insert':
        this.selectedMedias = [
          ...this.selectedMedias,
          event.detail.media,
        ];
        break;

      case 'delete':
        this.selectedMedias = this.selectedMedias
          .filter((media) => media.id !== event.detail.media.id);
        break;

      case 'replace':
        this.selectedMedias = [event.detail.media];
        break;

      default:
        break;
    }
  }

  /**
   * Fired when we click on the 'Confirm' button
   * to save the state in the input.
   */
  private _confirmSelection(event: CustomEvent<void>) {
    event.stopPropagation();
    EventEmitter.generalUpdate(this.selectedMedias, this.config?.identifier || '', this);
    this.isOpen = false;
  }

  /** Fired after we delete a media from the sidebar. */
  private _deleteMediaFromServer(event: CustomEvent<Media>) {
    event.stopPropagation();
    this.selectedMedias = this.selectedMedias
      .filter((media) => media.id !== event.detail.id);
  }

  private _openModal() {
    this.isOpen = true;
  }

  private _updateLanguage(event: CustomEvent<string>) {
    event.stopPropagation();

    Translator.activeLang = event.detail;
    this.activeLang = event.detail;
  }

  private _removeFromPreview(event: CustomEvent<QueueUpdate>): void {
    event.stopPropagation();

    this._updateMediaQueue(event);
    EventEmitter.generalUpdate(this.selectedMedias, this.config?.identifier || '', this);
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    return html`
      <button type='button' class='kondoButton' @click=${this._openModal}>${Translator.translate('ui.common.open_modal')}</button>
      <kondo-preview 
        .medias=${this.selectedMedias}
        .config=${this.config}
        .activeLang=${this.activeLang}
        @kondo:queue:update=${this._removeFromPreview}
      ></kondo-preview>
      ${this.isOpen ? html`
        <kondo-modal
          .config=${this.config}
          .selectedMedias=${this.selectedMedias}
          .activeLang=${this.activeLang}
          @kondo:close=${this._closeModal}
          @kondo:queue:update=${this._updateMediaQueue}
          @kondo:selection:confirm=${this._confirmSelection}
          @kondo:media:delete=${this._deleteMediaFromServer}
          @kondo:lang:update=${this._updateLanguage}
        ></kondo-modal>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-root': Root;
  }
}
