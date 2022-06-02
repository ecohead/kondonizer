// @ts-nocheck
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Kondonizer',
  tagline: 'Universal media library',
  url: 'https://kondonizer.aureldvx.fr',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  organizationName: 'ecohead',
  projectName: 'kondonizer',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {}
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',

        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Kondonizer',
        logo: {
          alt: 'Kondonizer logo',
          src: 'img/kondonizer-logo.svg',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'getting-started',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            href: 'https://github.com/ecohead/kondonizer',
            label: 'GitHub',
            position: 'right',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/kondonizer',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/THQzByDe6k',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/aureldvx',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ecohead/kondonizer',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} aureldvx. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      },
    }),
};

module.exports = config;
