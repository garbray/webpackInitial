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
const SassLintPlugin = require('sasslint-webpack-plugin');

module.exports = (env) => {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    context: resolve('src/js'),
    entry: {
      app: './main.js',
      vendor: ['./helpers'],
    },
    output: {
      filename: ifProd('js/bundle.[name].[chunkhash].js', 'js/bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    module: {
      rules: [
        { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: { compact: false } },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }) },
      ],
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new SassLintPlugin({
        context: ['src/scss'],
        glob: '**/*.scss',
        ignorePlugins: ['extract-text-webpack-plugin', 'html-webpack-plugin'],
        failOnWarning: false,
        failOnError: false,
        testing: false,
      }),
      new ExtractTextPlugin(ifProd('css/styles.[name].[chunkhash].css', 'css/styles.[name].css')),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
      })),
      new HtmlWebpackPlugin({
        template: '../index.html',
        // inject: 'head',
      }),
      ifProd(new OfflinePlugin()),
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
