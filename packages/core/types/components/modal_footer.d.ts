import { LitElement, TemplateResult } from "lit";
export default class ModalFooter extends LitElement {
    static styles: import("lit").CSSResult[];
    private selectionCount;
    private config?;
    activeLang?: string;
    private _handleClick;
    render(): TemplateResult<1>;
    private _displaySelectionCount;
    private _displaySelectionConstraints;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-modal-footer': ModalFooter;
    }
}
