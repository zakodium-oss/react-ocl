module.exports = {
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
};
