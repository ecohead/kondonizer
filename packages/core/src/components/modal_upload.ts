import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { NotificationTypes } from '../enums/notification_types.js';
import API from '../helpers/api.js';
import EventEmitter from '../helpers/events.js';
import { useModalUploadStyles } from "../helpers/theme.js";
import Translator from "../helpers/translator.js";
import { KondonizerOptions, Media } from '../types.js';

@customElement('kondo-modal-upload')
export default class ModalUpload extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useModalUploadStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @query('#uploaded_files')
  private inputField?: HTMLInputElement;

  @query('#dropzone')
  private dropZone?: HTMLDivElement;

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

  private async _handleInputSelection(event: InputEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.inputField) {
      return;
    }

    const { files } = this.inputField;

    if (!files || files.length === 0) {
      return;
    }

    for await (const file of Array.from(files)) {
      if (this._checkFileType(file)) {
        const media = await this._uploadFile(file);

        if (!media) {
          EventEmitter.addNotification({
            type: NotificationTypes.ERROR,
            message: Translator.translate('api_requests.common.upload_returns_no_media')
          }, this);
        } else {
          EventEmitter.uploadedMedia(media, this);
          EventEmitter.addNotification({
            type: NotificationTypes.SUCCESS,
            message: Translator.translate('api_requests.common.upload_success')
          }, this);
        }
      }
    }
  }

  private async _handleDropSelection(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) {
      return;
    }

    const { files } = event.dataTransfer;

    if (!files || files.length === 0) {
      return;
    }

    for await (const file of Array.from(files)) {
      if (this._checkFileType(file)) {
        const media = await this._uploadFile(file);

        if (!media) {
          EventEmitter.addNotification({
            type: NotificationTypes.ERROR,
            message: Translator.translate('api_requests.common.upload_returns_no_media')
          }, this);

          return;
        }

        EventEmitter.uploadedMedia(media, this);
        EventEmitter.addNotification({
          type: NotificationTypes.SUCCESS,
          message: Translator.translate('api_requests.common.upload_success')
        }, this);
      }
    }

    if (this.dropZone) {
      this.dropZone.classList.remove('--dropped');
    }
  }

  private _checkFileType(file: File): boolean {
    if (this.config && this.config.acceptedFiletypes) {
      if (this.config.acceptedFiletypes.length === 0) {
        return true;
      }

      const validFiletype = this.config.acceptedFiletypes.find((type) => type === file.type) !== undefined;

      if (!validFiletype) {
        EventEmitter.addNotification({
          type: NotificationTypes.ERROR,
          message: Translator.translate('api_requests.common.invalid_file_type')
        }, this);

        return false;
      }

      return true;
    }

    return false;
  }

  private _handleDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.dropZone) {
      this.dropZone.classList.add('--dropped');
    }
  }

  private _handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.dropZone) {
      this.dropZone.classList.remove('--dropped');
    }
  }

  private _uploadFile(file: File): Promise<Media | null> {
    return API.uploadFile({
      el: this,
      file,
      config: this.config
    });
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    return html`
      <div
        id="dropzone"
        class="dropzone"
        @dragenter=${this._handleDragEnter}
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDropSelection}
      >
        <form class="kondo-uploadForm">
          <strong>${Translator.translate('ui.modal_upload.title')}</strong>
          <label for="uploaded_files">${Translator.translate('ui.modal_upload.button_label')}</label>
          <input type="file" id="uploaded_files" ?multiple=${true} @change=${this._handleInputSelection} accept=${this.config && this.config.acceptedFiletypes && this.config.acceptedFiletypes.length > 0 ? this.config.acceptedFiletypes.join(',') : '*' } />
          <p>${Translator.translate('ui.modal_upload.help_message')}</p>
          ${this._displayAcceptedFiletypes()}
        </form>
      </div>
    `;
  }

  private _displayAcceptedFiletypes(): TemplateResult<1>|typeof nothing {
    if (!this.config || !this.config.acceptedFiletypes || this.config.acceptedFiletypes.length === 0) {
      return nothing;
    }

    return html`
      <details class="kondo-upload_acceptedFiletypes">
        <summary>${Translator.translate('ui.modal_upload.accepted_formats')}</summary>
        <div>
          <ul>
            ${this.config.acceptedFiletypes.map(type => html`
              <li>${type}</li>
            `)}
          </ul>  
        </div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal-upload': ModalUpload;
  }
}
