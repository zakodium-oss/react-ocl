const config = {
  presets: ['@babel/react'],
  plugins: [],
};

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'cjs') {
  config.plugins.push('@babel/transform-modules-commonjs');
}

module.exports = config;
