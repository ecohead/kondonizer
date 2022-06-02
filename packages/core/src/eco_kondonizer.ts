import { html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import './components/root.js';
import { KondonizerOptions } from "./types.js";

@customElement('eco-kondonizer')
export default class EcoKondonizer extends LitElement {
  @state()
  private componentReady = false;

  private componentOptions?: { config: KondonizerOptions, selectedMedias: Array<string|number>, defaultLang: string }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  public createInstance(options: { config: KondonizerOptions, selectedMedias: Array<string|number>, defaultLang: string }) {
    this.componentOptions = { ...options };
    this.componentReady = true;
  }

  render(): TemplateResult<1>|typeof nothing {
    if (!this.componentReady || !this.componentOptions) return nothing;

    return html`
      <kondo-root .config=${this.componentOptions.config} .selectedMediasIds=${this.componentOptions.selectedMedias} .activeLang=${this.componentOptions.defaultLang}></kondo-root>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'eco-kondonizer': EcoKondonizer;
  }
}
