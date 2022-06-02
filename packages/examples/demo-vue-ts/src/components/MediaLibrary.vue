<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { EcoKondonizer, defineConfig, KondonizerExport } from '@ecohead/kondonizer'

const kondonizer = ref<typeof EcoKondonizer|null>(null)

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
});

onMounted(() => {
  kondonizer.value.createInstance({
    config,
    selectedMedias: [],
    defaultLang: 'en'
  });
})

function handleSelection(event: CustomEvent<KondonizerExport>) {
  console.log(event.detail)
}
</script>

<template>
  <eco-kondonizer ref="kondonizer" @kondoupdate="handleSelection"></eco-kondonizer>
</template>

<style scoped>
</style>
