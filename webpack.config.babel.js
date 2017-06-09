const { resolve } = require('path');

module.exports = (env) => {
  return {
    context: resolve('src/js'),
    entry: './main.js',
    output: {
      filename: 'bundle.js',
      path: resolve('dist/js'),
      pathinfo: true,
      publicPath: '/dist/js/',
    },
    devtool: env.prod ? 'eval' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
      ],
    },
  };
};
