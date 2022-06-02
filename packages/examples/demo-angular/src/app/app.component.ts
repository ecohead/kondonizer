import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { defineConfig, EcoKondonizer, KondonizerExport } from '@ecohead/kondonizer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('kondonizer') kondonizer: typeof EcoKondonizer;

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

  ngAfterViewInit(): void {
    if (!this.kondonizer) return;

    this.kondonizer.nativeElement.createInstance({
      config: this.config,
      selectedMedias: [],
      defaultLang: 'en'
    })

    this.kondonizer.nativeElement.addEventListener('kondoupdate', this.handleSelection)
  }

  handleSelection(event: CustomEvent<KondonizerExport>) {
    console.log(event.detail);
  }
}
