export default {
  stories: ['../stories/**/*.stories.tsx'],

  addons: ['@storybook/addon-vitest'],

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
