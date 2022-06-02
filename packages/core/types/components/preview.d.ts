import { LitElement } from "lit";
import { KondonizerOptions } from "../types.js";
export default class Preview extends LitElement {
    static styles: import("lit").CSSResult[];
    private medias;
    config?: KondonizerOptions;
    activeLang?: string;
    private _handleRemove;
    private _handleCopy;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'kondo-preview': Preview;
    }
}
