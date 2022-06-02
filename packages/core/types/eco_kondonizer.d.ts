import { LitElement, nothing, TemplateResult } from "lit";
import './components/root.js';
import { KondonizerOptions } from "./types.js";
export default class EcoKondonizer extends LitElement {
    private componentReady;
    private componentOptions?;
    protected createRenderRoot(): Element | ShadowRoot;
    connectedCallback(): void;
    createInstance(options: {
        config: KondonizerOptions;
        selectedMedias: Array<string | number>;
        defaultLang: string;
    }): void;
    render(): TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'eco-kondonizer': EcoKondonizer;
    }
}
