import { defineConfig, EcoKondonizer, KondonizerExport } from "@ecohead/kondonizer/standalone";
import React, { useEffect, useRef } from "react";

export default function MediaLibrary(): JSX.Element {
  const ref = useRef<EcoKondonizer>();

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
      // delete: {
      //   uri: `${baseUri}/api/medias/%identifier%`,
      //   method: 'DELETE',
      //   statusCodeOk: 201,
      //   fetchOptions: {
      //     mode: 'cors'
      //   }
      // },
      show: {
        uri: `${baseUri}/api/medias/%identifier%`,
        method: 'GET',
        statusCodeOk: 200,
        fetchOptions: {
          mode: 'cors'
        }
      },
    //   update: {
    //     uri: `${baseUri}/api/medias/%identifier%`,
    //     method: 'PATCH',
    //     statusCodeOk: 201,
    //     fetchOptions: {
    //       mode: 'cors'
    //     }
    //   },
    //   upload: {
    //     uri: `${baseUri}/api/medias/upload`,
    //     method: 'POST',
    //     statusCodeOk: 201,
    //     fetchOptions: {
    //       mode: 'cors'
    //     }
    //   },
    }
  });

  useEffect(() => {
    ref.current.createInstance({
      config,
      selectedMedias: [],
      defaultLang: 'en'
    });

    ref.current.addEventListener<'kondoupdate'>('kondoupdate', (e: CustomEvent<KondonizerExport>) => {
      console.log(e.detail)
    })
  }, []);

  return (
    <eco-kondonizer ref={ref}></eco-kondonizer>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'eco-kondonizer'
    }
  }

  interface ElementEventMap {
    'kondoupdate': CustomEvent<KondonizerExport>
  }
}