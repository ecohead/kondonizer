import { defineConfig, EcoKondonizer } from '@ecohead/kondonizer';
import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

export class MediaLibrary extends LitElement {
  constructor() {
    super()
    const baseUri = 'https://ecohead.aureldvx.fr';
    this.config = defineConfig({
      multiple: true,
      selectionConstraints: {
        min: undefined,
        max: 4
      },
      endpoints: {
        list: {
          uri: `${baseUri}/api/medias/list`,
          method: 'GET',
          fetchOptions: {
            mode: 'cors',
          },
        },
        delete: {
          uri: `${baseUri}/api/medias/%identifier%`,
          method: 'DELETE',
          fetchOptions: {
            mode: 'cors',
          },
        },
        show: {
          uri: `${baseUri}/api/medias/%identifier%`,
          method: 'GET',
          fetchOptions: {
            mode: 'cors',
          },
        },
        update: {
          uri: `${baseUri}/api/medias/%identifier%`,
          method: 'PATCH',
          fetchOptions: {
            mode: 'cors',
          },
        },
        upload: {
          uri: `${baseUri}/api/medias/upload`,
          method: 'POST',
          fetchOptions: {
            mode: 'cors',
          },
        },
      },
      defaultGalleryLayout: 'grid'
    })
    this.kondonizer = createRef()
  }

  firstUpdated() {
    this.kondonizer.value.createInstance({
      config: this.config,
      selectedMedias: [],
      defaultLang: 'en'
    })
  }

  _handleSelection(event) {
    console.log(event.detail)
  }

  render() {
    return html`
      <eco-kondonizer ${ref(this.kondonizer)} @kondoupdate=${this._handleSelection}></eco-kondonizer>
    `
  }
}

window.customElements.define('media-library', MediaLibrary)
