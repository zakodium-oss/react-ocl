'use strict';

module.exports = ({config, mode}) => {
  if (mode === 'PRODUCTION') {
    // To avoid having minified names in source view
    config.optimization.minimize = false;
    config.devtool = false;
  }
  return config;
};
