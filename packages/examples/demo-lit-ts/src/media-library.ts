import { defineConfig, EcoKondonizer, KondonizerExport } from '@ecohead/kondonizer';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';

@customElement('media-library')
export class MediaLibrary extends LitElement {
  static styles = css``

  private baseUri = 'https://ecohead.aureldvx.fr';
  private config = defineConfig({
    multiple: true,
    selectionConstraints: {
      min: undefined,
      max: 4
    },
    endpoints: {
      list: {
        uri: `${this.baseUri}/api/medias/list`,
        method: 'GET',
        fetchOptions: {
          mode: 'cors',
        },
      },
      delete: {
        uri: `${this.baseUri}/api/medias/%identifier%`,
        method: 'DELETE',
        fetchOptions: {
          mode: 'cors',
        },
      },
      show: {
        uri: `${this.baseUri}/api/medias/%identifier%`,
        method: 'GET',
        fetchOptions: {
          mode: 'cors',
        },
      },
      update: {
        uri: `${this.baseUri}/api/medias/%identifier%`,
        method: 'PATCH',
        fetchOptions: {
          mode: 'cors',
        },
      },
      upload: {
        uri: `${this.baseUri}/api/medias/upload`,
        method: 'POST',
        fetchOptions: {
          mode: 'cors',
        },
      },
    },
    defaultGalleryLayout: 'grid'
  })

  private kondonizer: Ref<EcoKondonizer> = createRef()

  firstUpdated() {
    if (!this.kondonizer || !this.kondonizer.value) return;

    this.kondonizer.value.createInstance({
      config: this.config,
      selectedMedias: [],
      defaultLang: 'en'
    })
  }

  private _handleSelection(event: CustomEvent<KondonizerExport>) {
    console.log(event.detail)
  }

  render() {
    return html`
      <eco-kondonizer ${ref(this.kondonizer)} @kondoupdate=${this._handleSelection}></eco-kondonizer>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'kondoupdate': CustomEvent<KondonizerExport>
  }
}
