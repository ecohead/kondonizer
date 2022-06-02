import EcoKondonizer from "../src/eco_kondonizer.js";
import { defineConfig } from "../src/helpers/define_config.js";
import fr from '../src/translations/fr.js';
import type { KondonizerExport } from "../src/types.js";

const baseUri = 'https://ecohead.aureldvx.fr';
const config = defineConfig({
  multiple: true,
  selectionConstraints: {
    min: undefined,
    max: 4
  },
  endpoints: {
    list: {
      uri: `${baseUri}/api/medias/list`,
      method: 'GET',
      statusCodeOk: 200,
      fetchOptions: {
        mode: 'cors'
      }
    },
    delete: {
      uri: `${baseUri}/api/medias/%identifier%`,
      method: 'DELETE',
      statusCodeOk: 201,
      fetchOptions: {
        mode: 'cors'
      }
    },
    show: {
      uri: `${baseUri}/api/medias/%identifier%`,
      method: 'GET',
      statusCodeOk: 200,
      fetchOptions: {
        mode: 'cors'
      }
    },
    update: {
      uri: `${baseUri}/api/medias/%identifier%`,
      method: 'PATCH',
      statusCodeOk: 201,
      fetchOptions: {
        mode: 'cors'
      }
    },
    upload: {
      uri: `${baseUri}/api/medias/upload`,
      method: 'POST',
      statusCodeOk: 201,
      fetchOptions: {
        mode: 'cors'
      }
    },
  },
  translations: {
    'fr': fr
  }
});

const root = document.querySelector('eco-kondonizer') as EcoKondonizer;
root.createInstance({
  config,
  selectedMedias: [],
  defaultLang: 'en'
});

root.addEventListener<any>('kondo:update', (e: CustomEvent<KondonizerExport>) => {
  console.log(e.detail)
})
