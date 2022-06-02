import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { useModalSidebarStyles } from "../helpers/theme.js";
import Translator from '../helpers/translator.js';
import { KondonizerOptions, Media } from "../types.js";
import './modal_edition.js';
import './modal_upload.js';

@customElement('kondo-modal-sidebar')
export default class ModalSidebar extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useModalSidebarStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @property({
    type: Object
  })
  private config?: KondonizerOptions;

  @property({
    type: Object
  })
  private mediaToEdit?: Media;

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    if (this.mediaToEdit) {
      return html`
        <kondo-modal-edition
          .media=${this.mediaToEdit}
          .config=${this.config}
          .activeLang=${this.activeLang}
        ></kondo-modal-edition>
      `;
    }

    if (this.config?.endpoints?.upload === undefined) {
      return html`
        <div class="kondo-sidebarEditMessage">${Translator.translate('ui.modal_sidebar.clic_to_edit')}</div>
      `;
    }

    return html `
      <kondo-modal-upload
        .config=${this.config}
        .activeLang=${this.activeLang}
      ></kondo-modal-upload>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal-sidebar': ModalSidebar;
  }
}
