import { LitElement, nothing, PropertyValues } from "lit";
import { KondonizerOptions, Media } from '../types.js';
export default class ModalEdition extends LitElement {
    static styles: import("lit").CSSResult[];
    private legendField?;
    private altTextField?;
    private confirmationDialog?;
    private validationErrors;
    private deleteConfirmationRequested;
    media?: Media;
    config?: KondonizerOptions;
    activeLang?: string;
    protected update(changedProperties: PropertyValues): void;
    private _handleSubmit;
    private _handleHide;
    private _handleDeleteRequest;
    private _confirmDelete;
    private _cancelDelete;
    private _getInputValues;
    private _handleAltInput;
    private _handleLegendInput;
    private _validateInputs;
    render(): import("lit").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal-edition': ModalEdition;
    }
}
