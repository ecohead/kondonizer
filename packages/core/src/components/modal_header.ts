import { html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref } from 'lit/directives/ref.js';
import EventEmitter from '../helpers/events.js';
import { useModalHeaderStyles } from "../helpers/theme.js";
import Translator from '../helpers/translator.js';
import { DropdownStates, GalleryArrangements, GalleryLayout } from "../types.js";

@customElement('kondo-modal-header')
export default class ModalHeader extends LitElement {
  // -----------------------------------------------------------------------
  // Custom styling for this component.
  // -----------------------------------------------------------------------

  static styles = useModalHeaderStyles();

  // -----------------------------------------------------------------------
  // Properties definition.
  // -----------------------------------------------------------------------

  private filterTypeForm = createRef<HTMLFormElement>();

  private sortForm = createRef<HTMLFormElement>();

  private translateForm = createRef<HTMLFormElement>();

  @state()
  private dropdownStates: DropdownStates = {
    filter: false,
    sort: false,
    translate: false,
  };

  @property({
    type: Array
  })
  private mediaTypes: string[] = [];

  @property({
    type: Object
  })
  private activeArrangements: GalleryArrangements & { layout?: GalleryLayout } = {
    filters: ['all'],
    sorter: { field: 'uploadedAt', order: 'DESC' },
    layout: 'grid'
  };

  @property({
    type: String,
  })
  activeLang?: string;

  // -----------------------------------------------------------------------
  // UI handlers.
  // -----------------------------------------------------------------------

  private _handleClick() {
    EventEmitter.closeModal(this);
  }

  private _handleRefresh() {
    EventEmitter.refreshList(this);
  }

  private _handleSubmitFilters(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.filterTypeForm) return;

    const formData = new FormData(this.filterTypeForm.value);
    EventEmitter.filterList(formData.getAll('media_types') as string[], this);
    this.dropdownStates = { ...this.dropdownStates, filter: false };
  }

  private _handleClearFilters(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    EventEmitter.suppressListFilters(this);

    if (this.filterTypeForm.value) {
      (Array.from(this.filterTypeForm.value.querySelectorAll('input[name="media_types"]')) as HTMLInputElement[])
        .forEach(input => {
          // eslint-disable-next-line no-param-reassign
          input.checked = true;
        })
    }
    this.dropdownStates = { ...this.dropdownStates, filter: false };
  }

  private _handleSubmitSort(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.sortForm) return;

    const formData = new FormData(this.sortForm.value);
    EventEmitter.sortList({
      field: formData.get('sort_by') as 'filename'|'uploadedAt',
      order: formData.get('order_by') as 'ASC'|'DESC',
    }, this);
    this.dropdownStates = { ...this.dropdownStates, sort: false };
  }

  private _handleSubmitTranslate(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.translateForm) return;

    const formData = new FormData(this.translateForm.value);
    EventEmitter.updateActiveLang(formData.get('lang') as string || Translator.activeLang, this);
    this.dropdownStates = { ...this.dropdownStates, translate: false };
  }

  private _handleOpenTypeSelection(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownStates = {
      filter: !this.dropdownStates.filter,
      sort: false,
      translate: false
    };
  }

  private _handleOpenOrderBy(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownStates = {
      filter: false,
      sort: !this.dropdownStates.sort,
      translate: false
    };
  }

  private _handleOpenTranslations(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownStates = {
      filter: false,
      sort: false,
      translate: !this.dropdownStates.translate
    };
  }

  private _handleListViewChange(event: Event, layout: GalleryLayout) {
    event.preventDefault();
    event.stopPropagation();

    EventEmitter.changeGalleryLayout(layout, this);
  }

  private _handleSearch(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const input = event.target as HTMLInputElement|null;

    if (!input) return;

    EventEmitter.submitSearch(input.value, this);
  }

  // -----------------------------------------------------------------------
  // Rendering methods.
  // -----------------------------------------------------------------------

  render() {
    return html`
      <button class="kondoButton --outline kondo-closeModal" type="button" @click=${this._handleClick} title="${Translator.translate('ui.common.close')}">${Translator.translate('ui.common.close')}</button>
      <div class="kondo-filters">
        ${this._displayMediaTypeSelect()}
        ${this._displayOrderByFilter()}
        ${this._displayLanguageSelection()}
      </div>
      <label class="kondo-search">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input type="search" name="search" id="search" placeholder="${Translator.translate('ui.modal_header.search_placeholder')}" @input=${this._handleSearch}>
      </label>
      <div class="kondo-galleryActions">
        <button class="kondoButton --outline --square" type="button" @click=${(e: Event) => this._handleListViewChange(e, 'grid')} ?data-checked=${this.activeArrangements.layout === 'grid'} title="${Translator.translate('ui.modal_header.layout_grid')}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"/>
          </svg>
        </button>
        <button class="kondoButton --outline --square" type="button" @click=${(e: Event) => this._handleListViewChange(e, 'list')} ?data-checked=${this.activeArrangements.layout === 'list'} title="${Translator.translate('ui.modal_header.layout_list')}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
        </button>
      </div>
      <button class="kondoButton --outline --square kondo-refreshList" type="button" @click=${this._handleRefresh} title="${Translator.translate('ui.modal_header.refresh')}">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
      </button>
    `
  }

  private _displayMediaTypeSelect(): TemplateResult<1>|typeof nothing {
    if (this.mediaTypes.length === 0) {
      return nothing;
    }

    return html`
      <div class="kondo-filters_filetype">
        <button class="kondoButton --outline --square" type="button" @click=${this._handleOpenTypeSelection} title="${Translator.translate('ui.modal_header.filter_by_filetype')}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
          </svg>
        </button>
        ${this.dropdownStates.filter ? html`
          <form ${ref(this.filterTypeForm)} @submit=${this._handleSubmitFilters} class="kondo-filters_filetypeModal">
            <div class="kondo-filters_filetypeModalChoices">
              ${this.mediaTypes.map(type => html`
                <label>
                  <input type="checkbox" name="media_types" id="media_types[${type}]" .value=${type} ?checked=${this.activeArrangements.filters.find((filter) => filter === type) !== undefined || (this.activeArrangements.filters.length === 1 && this.activeArrangements.filters[0] === 'all')}>
                  <span>${type}</span>
                </label>
              `)}
            </div>
            <div class="kondo-filters_filetypeModalActions">
              <button class="kondoButton" type="submit">${Translator.translate('ui.modal_header.confirm_choice')}</button>
              <button class="kondoButton --outline" type="button" @click=${this._handleClearFilters}>${Translator.translate('ui.modal_header.clear_filters')}</button>
            </div>
          </form>
        ` : nothing}
      </div>
    `;
  }

  private _displayOrderByFilter(): TemplateResult<1> {
    return html`
      <div class="kondo-filters_filetype">
        <button class="kondoButton --outline --square" type="button" @click=${this._handleOpenOrderBy} title="${Translator.translate('ui.modal_header.sort_by')}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
          </svg>
        </button>
        ${this.dropdownStates.sort ? html`
          <form ${ref(this.sortForm)} @submit=${this._handleSubmitSort} class="kondo-filters_filetypeModal">
            <div class="kondo-filters_filetypeModalChoices">
              ${['filename', 'uploadedAt'].map((type: string) => html`
                <label>
                  <input type="radio" name="sort_by" id="sort_by[${type}]" .value=${type} ?checked=${this.activeArrangements.sorter.field === type}>
                  <span>${
                    Translator.translate(`ui.filters.${type}`)
                  }</span>
                </label>
              `)}
            </div>
            <div class="kondo-filters_filetypeModalChoices">
              ${['ASC', 'DESC'].map((type) => html`
                <label>
                  <input type="radio" name="order_by" id="order_by[${type}]" .value=${type} ?checked=${this.activeArrangements.sorter.order === type}>
                  <span>${type}</span>
                </label>
              `)}
            </div>
            <div class="kondo-filters_filetypeModalActions">
              <button class="kondoButton" type="submit">${Translator.translate('ui.modal_header.confirm_choice')}</button>
            </div>
          </form>
        ` : nothing}
      </div>
    `;
  }

  private _displayLanguageSelection(): TemplateResult<1>|typeof nothing {
    if (Translator.dictionaries.size <= 0) {
      return nothing;
    }

    return html`
      <div class="kondo-filters_filetype">
        <button class="kondoButton --outline --square" type="button" @click=${this._handleOpenTranslations} title="${Translator.translate('ui.modal_header.translate')}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
            <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
          </svg>
        </button>
        ${this.dropdownStates.translate ? html`
          <form ${ref(this.translateForm)} @submit=${this._handleSubmitTranslate} class="kondo-filters_filetypeModal">
            <div class="kondo-filters_filetypeModalChoices">
              ${Array.from(Translator.dictionaries.keys()).map(key => html`
                <label>
                  <input type="radio" name="lang" id="lang[${key}]" .value=${key} ?checked=${this.activeLang === key}>
                  <span>${key}</span>
                </label>
              `)}
            </div>
            <div class="kondo-filters_filetypeModalActions">
              <button class="kondoButton" type="submit">${Translator.translate('ui.modal_header.confirm_choice')}</button>
            </div>
          </form>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondo-modal-header': ModalHeader;
  }
}
