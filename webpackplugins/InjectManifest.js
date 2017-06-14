/**
 * Inject a <script> tag containing the Webpack manifest prior to HtmlPlugin
 * injecting tags for generated assets.
 */
function InjectManifest(options) {
  return options;
}

InjectManifest.prototype.apply = (compiler) => {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, cb) => {
      const { assets, html } = htmlPluginData;
      htmlPluginData.html = html.replace('<body>', `${assets.webpackManifest}<body>`); // eslint-disable-line
      cb(null, htmlPluginData);
    });
  });
};

module.exports = InjectManifest;
