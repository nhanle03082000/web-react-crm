const CracoAlias = require('craco-alias');
const WebpackBar = require('webpackbar');

process.env.BROWSER = 'none';

module.exports = {
  webpack: {
    plugins: [new WebpackBar({ profile: true })],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './src/',
        /* tsConfigPath should point to the file where "baseUrl" and "paths"
         are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
