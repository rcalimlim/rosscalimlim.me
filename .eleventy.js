const { format, formatISO9075, formatRFC7231 } = require("date-fns");

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("navPages", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("navPages")
      .sort((a, b) => a.data.navIndex - b.data.navIndex);
  });
  eleventyConfig.addCollection("deps", () => [0, 1, 2, 3, 4]);

  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // bust cached files
  eleventyConfig.addFilter("bust", (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    const relativeUrl =
      urlPart.charAt(0) == "/" ? urlPart.substring(1) : urlPart;

    try {
      const fileStats = fs.statSync(relativeUrl);
      const dateTimeModified = new DateTime(fileStats.mtime).toFormat("X");

      params.set("v", dateTimeModified);
    } catch (error) {}

    return `${urlPart}?${params}`;
  });

  eleventyConfig.addFilter(
    "formatDate",
    (ts = Date.now(), formatString = "y LLLL dd HH:mm:ss") => {
      if (formatString === "ISO9075") {
        return formatISO9075(ts);
      }

      if (formatString === "formatRFC7231") {
        return formatRFC7231(ts);
      }

      return format(ts, formatString);
    }
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
