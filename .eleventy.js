module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("console", function(value) {
    const str = util.inspect(value);
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  });

  eleventyConfig.addCollection("navPages", function(collectionApi) {
    return collectionApi.getFilteredByTag("navPages").sort((a, b) => a.data.navIndex - b.data.navIndex);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    }
  }
}
