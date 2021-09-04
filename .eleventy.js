module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('console', function(value) {
    const str = util.inspect(value);
    return `<div style="white-space: pre-wrap;">${unescape(str)}</div>;`
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    }
  }
}
