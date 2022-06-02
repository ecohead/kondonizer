import { html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property } from 'lit/decorators.js';
import EventEmitter from '../helpers/events.js';
import { useModalFooterStyles } from "../helpers/theme.js";
import Translator from "../helpers/translator.js";
import { KondonizerOptions } from "../types.js";

@customElement('kondo-modal-footer')
export default class ModalFooter extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useModalFooterStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  @property({
    type: Number
  })
  private selectionCount: number = 0;

  @property({
    type: Object,
  })
  private config?: KondonizerOptions;

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  private _handleClick() {
    EventEmitter.confirmSelection(this);
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    return html`
      ${this._displaySelectionConstraints()}
      ${this._displaySelectionCount()}
      <button class="kondoButton --success" type="button" @click=${this._handleClick}>${Translator.translate('ui.modal_footer.confirm_selection')}</button>
    `;
  }

  private _displaySelectionCount() {
    if (this.selectionCount === 0) {
      return html `<span class="kondo-footerInformations">${Translator.translate('ui.modal_footer.no_media_selected')}</span>`;
    }

    if (this.selectionCount === 1) {
      return html `<span class="kondo-footerInformations">${Translator.translate('ui.modal_footer.one_media_selected')}</span>`;
    }

    return html `<span class="kondo-footerInformations">${Translator.translate('ui.modal_footer.multiple_medias_selected', { count: this.selectionCount })}</span>`;
  }

  private _displaySelectionConstraints(): TemplateResult<1> | typeof nothing {
    if (!this.config || !this.config.selectionConstraints || !this.config.multiple) {
      return nothing;
    }

    const { min, max } = this.config.selectionConstraints;

    if (min && max) {
      return html`<span class="kondo-footerInformations kondo-selectionConstraints">${Translator.translate('ui.modal_footer.selection_constraint_between', { min, max })}</span>`;
    }

    if (min && !max) {
      return html`<span class="kondo-footerInformations kondo-selectionConstraints">${Translator.translate('ui.modal_footer.selection_constraint_min', { min })}</span>`;
    }

    if (!min && max) {
      return html`<span
        class="kondo-footerInformations kondo-selectionConstraints">${Translator.translate('ui.modal_footer.selection_constraint_max', { max })}</span>`;
    }

    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal-footer': ModalFooter;
  }
}
