module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("navPages", function(collectionApi) {
    return collectionApi.getFilteredByTag("navPages").sort((a, b) => a.data.navIndex - b.data.navIndex);
  });

  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  return {
    dir: {
      input: "src",
      output: "dist",
    }
  }
}
