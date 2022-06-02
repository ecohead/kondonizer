import { LitElement } from 'lit';
import './modal_edition.js';
import './modal_upload.js';
export default class ModalSidebar extends LitElement {
    static styles: import("lit").CSSResult[];
    private config?;
    private mediaToEdit?;
    activeLang?: string;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal-sidebar': ModalSidebar;
    }
}
