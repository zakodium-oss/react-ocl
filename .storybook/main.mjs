export default {
  stories: ['../stories/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
