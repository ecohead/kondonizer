import { LitElement, TemplateResult } from 'lit';
import { KondonizerOptions } from '../types.js';
export default class ModalUpload extends LitElement {
    static styles: import("lit").CSSResult[];
    private inputField?;
    private dropZone?;
    config?: KondonizerOptions;
    activeLang?: string;
    private _handleInputSelection;
    private _handleDropSelection;
    private _checkFileType;
    private _handleDragEnter;
    private _handleDragOver;
    private _handleDragLeave;
    private _uploadFile;
    render(): TemplateResult<1>;
    private _displayAcceptedFiletypes;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal-upload': ModalUpload;
    }
}
