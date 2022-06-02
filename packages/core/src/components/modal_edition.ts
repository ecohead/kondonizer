// @ts-expect-error
import fileSize from "filesize/lib/filesize.esm.js";
import { html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { ZodIssue } from "zod";
import API from '../helpers/api.js';
import EventEmitter from '../helpers/events.js';
import { renderThumbnail } from "../helpers/media.js";
import { useEditMediaStyles } from '../helpers/theme.js';
import Translator from "../helpers/translator.js";
import { KondonizerOptions, Media } from '../types.js';

@customElement('kondo-modal-edition')
export default class ModalEdition extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useEditMediaStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @query('#legend_field')
  private legendField?: HTMLInputElement;

  @query('#alt_text_field')
  private altTextField?: HTMLInputElement;

  @query('#confirmation_dialog')
  private confirmationDialog?: HTMLDialogElement;

  @state()
  private validationErrors: { altText: ZodIssue[], legend: ZodIssue[] } = { altText: [], legend: []};

  @state()
  private deleteConfirmationRequested: boolean = false;

  @property({
    type: Object
  })
  media?: Media;

  @property({
    type: Object
  })
  config?: KondonizerOptions;

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // Component lifecycle hooks.
  // -----------------------------------------------------------------------

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.has('media')) {
      this.validationErrors.altText = [];
      this.validationErrors.legend = [];

      if (this.legendField && this.media) {
        this.legendField.value = this.media.legend || '';
      }

      if (this.altTextField && this.media) {
        this.altTextField.value = this.media.altText || '';
      }
    }
  }

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  private async _handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const updatedMedia = await API.updateMedia({
      el: this,
      media: this.media,
      config: this.config,
      formData: {
        alt_text: this.altTextField?.value,
        legend: this.legendField?.value
      },
      params: {
        'identifier': this.media!.id
      }
    })

    if (updatedMedia) {
      EventEmitter.saveMedia(updatedMedia, this);
    }
  }

  private _handleHide() {
    EventEmitter.hideMediaInEdition(this);
  }

  private async _handleDeleteRequest() {
    this.deleteConfirmationRequested = true;
    // @ts-expect-error
    this.confirmationDialog.showModal();
  }

  private async _confirmDelete() {
    if (!this.deleteConfirmationRequested) return;

    await API.deleteMedia({
      el: this,
      media: this.media,
      config: this.config,
      params: {
        'identifier': this.media!.id
      }
    });

    this.deleteConfirmationRequested = false;
    // @ts-expect-error
    this.confirmationDialog.close();
  }

  private _cancelDelete() {
    this.deleteConfirmationRequested = false;
    // @ts-expect-error
    this.confirmationDialog.close();
  }

  private _getInputValues() {
    return {
      alt_text: this.altTextField?.value || '',
      legend: this.legendField?.value || '',
    }
  }

  private _handleAltInput(event: InputEvent) {
    event.stopPropagation();
    this._validateInputs();
  }

  private _handleLegendInput(event: InputEvent) {
    event.stopPropagation();
    this._validateInputs();
  }

  private _validateInputs() {
    if (this.config?.validators?.editSchema) {
      const payload = this.config.validators.editSchema().safeParse(this._getInputValues());

      if (! payload.success) {
        this.validationErrors = payload.error.issues.reduce((acc: { altText: ZodIssue[], legend: ZodIssue[] }, issue) => {
          if (issue.path[0] === 'legend') {
            acc.legend.push(issue);
            return acc;
          }

          if (issue.path[0] === 'alt_text') {
            acc.altText.push(issue);
            return acc;
          }

          return acc;
        }, { altText: [], legend: [] });
      } else {
        this.validationErrors = {
          altText: [],
          legend: [],
        };
      }
    }
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    if (!this.media) {
      return nothing;
    }

    return html`
      <form class="kondo-editMedia" @submit=${this._handleSubmit}>
        <div class="kondo-editMedia_header">
          <strong class="kondo-editMedia_headerTitle">${Translator.translate('ui.sidebar_edit.title')}</strong>
          <div class="kondo-editMedia_headerActions">
            <button type="button" class="kondo-editMedia_close" @click=${this._handleHide} title="${Translator.translate('ui.sidebar_edit.close_detail')}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            <button type="submit" class="kondo-editMedia_save" title="${Translator.translate('ui.sidebar_edit.save_changes')}" ?disabled=${this.validationErrors.altText.length > 0 || this.validationErrors.legend.length > 0}>
              <span>${Translator.translate('ui.sidebar_edit.save_changes')}</span>
            </button>
            ${this.config?.endpoints?.delete ? html`
              <button type="button" class="kondo-editMedia_delete" title="${Translator.translate('ui.sidebar_edit.delete_media')}" @click=${this._handleDeleteRequest}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
              </button>
            ` : nothing}
          </div>
        </div>
        <div class="kondo-editMedia_form">
          ${this.config && this.config.customPlaceholders ? renderThumbnail({
            media: this.media,
            placeholders: this.config.customPlaceholders,
            cssClasses: {
              thumbnail: 'kondo-editItem_thumbnail',
              name: 'kondo-editItem_thumbnailName'
            },
            previewList: this.config.builtinPreviews || []
          }) : nothing}
          <div class="kondo-formControl">
            <label for="alt_text_field" class="kondo-formLabel">${Translator.translate('ui.sidebar_edit.form.alt_text_label')}</label>
            <input id="alt_text_field" class="kondo-formInput" name="alt_text" placeholder="${Translator.translate('ui.sidebar_edit.form.alt_text_placeholder')}" .value=${this.media.altText || ''} @input=${this._handleAltInput} />
            ${this.validationErrors.altText.length > 0 ? html`
              <ul class="kondo-formErrors">
                ${this.validationErrors.altText.map(issue => html`
                  <li class="kondo-formError">${issue.message}</li>
                `)}
              </ul>
            ` : nothing}
          </div>
          <div class="kondo-formControl">
            <label for="legend_field" class="kondo-formLabel">${Translator.translate('ui.sidebar_edit.form.legend_label')}</label>
            <input id="legend_field" class="kondo-formInput" name="legend" placeholder="${Translator.translate('ui.sidebar_edit.form.legend_placeholder')}" .value=${this.media.legend || ''} @input=${this._handleLegendInput} />
            ${this.validationErrors.legend.length > 0 ? html`
              <ul class="kondo-formErrors">
                ${this.validationErrors.legend.map(issue => html`
                  <li class="kondo-formError">${issue.message}</li>
                `)}
              </ul>
            ` : nothing}
          </div>
          <ul class="kondo-editMedia_details">
            ${this.media.filename ? html`<li><b>${Translator.translate('ui.sidebar_edit.media_infos.name')}&nbsp;:&nbsp;</b>${this.media.filename}</li>` : nothing}
            ${this.media.filetype ? html`<li><b>${Translator.translate('ui.sidebar_edit.media_infos.type')}&nbsp;:&nbsp;</b>${this.media.filetype}</li>` : nothing}
            ${this.media.filesize ? html`<li><b>${Translator.translate('ui.sidebar_edit.media_infos.size')}&nbsp;:&nbsp;</b>${fileSize(Number(this.media.filesize), { locale: 'fr' })}</li>` : nothing}
            ${this.media.uploadedAt ? html`<li><b>${Translator.translate('ui.sidebar_edit.media_infos.uploaded_at')}&nbsp;:&nbsp;</b>${Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: "short", year: "numeric" }).format(new Date(this.media.uploadedAt))}</li>` : nothing}
            ${this.media.uploadedBy ? html`<li><b>${Translator.translate('ui.sidebar_edit.media_infos.uploaded_by')}&nbsp;:&nbsp;</b>${this.media.uploadedBy}</li>` : nothing}
          </ul>
        </div>
      </form>
      <dialog id="confirmation_dialog">
        <p>Êtes-vous sûr de vouloir supprimer ce media ?</p>
        <button type="button" class="kondoButton --outline" @click=${this._cancelDelete}>Annuler la suppression</button>
        <button type="button" class="kondoButton --danger" @click=${this._confirmDelete}>Confirmer la suppression</button>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal-edition': ModalEdition;
  }
}
