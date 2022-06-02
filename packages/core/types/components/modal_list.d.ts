import { LitElement } from "lit";
import { KondonizerOptions, Media } from "../types.js";
export default class ModalList extends LitElement {
    static styles: import("lit").CSSResult[];
    medias: Array<Media>;
    config?: KondonizerOptions;
    selection: Array<Media>;
    private galleryLayout;
    activeLang?: string;
    private _isInitiallySelected;
    private _handleSelectMedia;
    private _handleEditMedia;
    private _handleReplaceMedia;
    private _handleCopy;
    render(): import("lit").TemplateResult<1>;
    private _renderEmptyList;
    private _renderListItems;
    private _renderCheckboxVariant;
    private _renderRadioVariant;
    private _checkSelectionConstraints;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal-list': ModalList;
    }
}
