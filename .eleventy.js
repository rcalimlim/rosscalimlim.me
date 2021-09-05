const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("navPages", function(collectionApi) {
    return collectionApi.getFilteredByTag("navPages").sort((a, b) => a.data.navIndex - b.data.navIndex);
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    }
  }
}
