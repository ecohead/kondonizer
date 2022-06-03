![Kondonizer : Universal Media Library as a Web Component.](https://static.aureldvx.fr/ecohead/kondonizer/kondonizer-banner.jpg)

![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)
![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)
![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)
[![Npm](https://badgen.net/badge/icon/npm?icon=npm&label)](https://https://npmjs.com/package/@ecohead/kondonizer)
[![Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/aureldvx)
[![Support Server](https://img.shields.io/discord/980898930869031002.svg?label=Discord&logo=Discord&colorB=7289da&style=flat)](https://discord.gg/gPFM7ffu5B)

![npm](https://img.shields.io/npm/v/@ecohead/kondonizer?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@ecohead/kondonizer?style=for-the-badge)

![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

[![Support Server](https://img.shields.io/discord/980898930869031002.svg?label=Discord&logo=Discord&colorB=7289da&style=for-the-badge)](https://discord.gg/gPFM7ffu5B)

# Kondonizer

Kondonizer is a custom element (a native HTML tag) that can be integrated in any frontend code. It displays a media library based on a Media model, like WordPress does internally. You can select, upload, edit and delete one or multiple files, all based on a configuration object highly customizable.

This web component needs between 2 and 5 API endpoints to be fully working. More info in the [documentation](https://kondonizer.aureldvx.fr/specify-api-endpoints/).


## Documentation

The full documentation is accessible in a [dedicated website](https://kondonizer.aureldvx.fr/).


## Installation

You can use your preferred package manager.

[npm](https://www.npmjs.com/)
```bash
npm install @ecohead/kondonizer --save
```
[yarn](https://yarnpkg.com/)
```bash
yarn add @ecohead/kondonizer --save
```
[pnpm](https://pnpm.io/)
```bash
pnpm install @ecohead/kondonizer --save
```

## Configuration

### Add the custom-element to your page

The first step is to place the HTML tag where you need it in your template :

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <!-- Calls the custom-element -->
  <eco-kondonizer></eco-kondonizer>
</body>
</html>
```

At this point, you will see any changes, because you need to create an instance of kondonizer to actually display the component UI.

### Create a new instance of the component

The `eco-kondonizer` custom element provide a method to create a new instance with some options. To display the component UI, you need to create a new instance as follows :

```js
  // At the top of the file
  import { EcoKondonizer, defineConfig } from "@ecohead/kondonizer";

  // Anywhere in the same file
  const kondonizer = document.querySelector('eco-kondonizer');

  if (!kondonizer) return;

  kondonizer.createInstance({
    // Create default options, but necessary to be customized
    config: defineConfig(),
    // Pass [] to no existing selection, or an array of ids (e.g. [12,28,46])
    selectedMedias: [],
    // Defaults to 'en-US'
    defaultLang: 'fr-FR'
  });
```

> **Note**
> All the options available are listed [here](https://aureldvx.fr/ecohead/kondonizer/configuration-options).

> **Warning**
> Some config options are required (e.g. **server endpoints**), so you need to pass a correct config to view the component UI.

### Listen to selection confirmation

A [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) is emitted each time the user clicks on the confirm button in the modal.
So, to get the user selection, you have to listen to this event as follows :

```js
  kondonizer.addEventListener('kondoupdate', (e) => {
    console.log(e.detail)
  });

  /**
   * Outputs :
   * {
   *    identifier: 'some-uuid', // Unique identifier of the instance
   *    selection: [12,24] // All media ids selected in the modal
   * }
   */
```

### Et voilà !

You now have a fully functional web component that you can integrate in any of your templates.

If you need more details in the integration in the most popular front-end frameworks and libraries, see [Integrate with front-end frameworks](ttps://aureldvx.fr/ecohead/kondonizer/integrate-with-frameworks).

## Preview

You can also have a working demo on the documentation website.

  ![Kondonizer preview image](https://static.aureldvx.fr/ecohead/kondonizer/kondonizer-preview.png)

## Credits
- [Bootstrap Icons](https://icons.getbootstrap.com/) for all icons
- [Tailwind CSS](https://tailwindcss.com/) for default color palette
- [Unsplash](https://unsplash.com/) for all demo images
- [Symfony](https://symfony.com/) for demo API
- [Docusaurus](https://docusaurus.io/) for documentation website

## License
This library is MIT licensed.
