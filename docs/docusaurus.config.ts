import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ScaleformUI',
  tagline: 'A GTA V Scaleform library for FiveM',
  favicon: 'img/favicon.ico',

  url: 'https://manups4e.github.io',
  baseUrl: '/ScaleformUI/',

  organizationName: 'manups4e', // Usually your GitHub org/user name.
  projectName: 'ScaleformUI', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        excludeImports: true,
        removeDuplicateHeadings: true,
        addMdExtension: true,
        preserveDirectoryStructure: true,
        logLevel: 'normal',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/manups4e/ScaleformUI/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ScaleformUI',
      logo: {
        alt: 'ScaleformUI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/manups4e/ScaleformUI',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/KKN7kRT2vM',
          label: 'Discord',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/KKN7kRT2vM',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/manups4e/ScaleformUI',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ScaleformUI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'lua'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
