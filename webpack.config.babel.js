const { resolve } = require('path');
const webpack = require('webpack');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    context: resolve('src/js'),
    entry: {
      app: './main.js',
      vendor: ['./helpers'],
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist/js'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [
        { test: /\.js$/, loader: 'babel-loader', query: { compact: false } },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }) },
      ],
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
      })),
      new HtmlWebpackPlugin({
        template: '../index.html',
        // inject: 'head',
      }),
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"'),
        },
      }),
      ifProd(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      })),
      new FriendlyErrorsPlugin(),
    ]),
  };
};
