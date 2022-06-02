import { LitElement, TemplateResult } from "lit";
export default class ModalHeader extends LitElement {
    static styles: import("lit").CSSResult[];
    private filterTypeForm;
    private sortForm;
    private translateForm;
    private dropdownStates;
    private mediaTypes;
    private activeArrangements;
    activeLang?: string;
    private _handleClick;
    private _handleRefresh;
    private _handleSubmitFilters;
    private _handleClearFilters;
    private _handleSubmitSort;
    private _handleSubmitTranslate;
    private _handleOpenTypeSelection;
    private _handleOpenOrderBy;
    private _handleOpenTranslations;
    private _handleListViewChange;
    private _handleSearch;
    render(): TemplateResult<1>;
    private _displayMediaTypeSelect;
    private _displayOrderByFilter;
    private _displayLanguageSelection;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal-header': ModalHeader;
    }
}
