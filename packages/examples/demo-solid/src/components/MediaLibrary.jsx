import { defineConfig, EcoKondonizer } from "@ecohead/kondonizer";
import { onMount } from "solid-js";

function MediaLibrary() {
  let kondonizer;

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

  onMount(() => {
    if (!kondonizer) return;

    kondonizer.createInstance({
      config,
      selectedMedias: [],
      defaultLang: 'en'
    })

    kondonizer.addEventListener('kondoupdate', handleSelection);
  })

  const handleSelection = (event) => {
    console.log(event.detail)
  }

  return <eco-kondonizer ref={kondonizer}></eco-kondonizer>;
}

export default MediaLibrary;