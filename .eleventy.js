const { format, formatRFC7231 } = require('date-fns');

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("navPages", function(collectionApi) {
    return collectionApi.getFilteredByTag("navPages").sort((a, b) => a.data.navIndex - b.data.navIndex);
  });

  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  eleventyConfig.addFilter("formatRFC7231", (ts) => formatRFC7231(new Date(ts)));
  eleventyConfig.addFilter("formatDate", (ts, formatString = "y LLLL dd HH:mm") => format(new Date(ts), formatString));

  return {
    dir: {
      input: "src",
      output: "dist",
    }
  }
}
