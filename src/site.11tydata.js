const package = require("../package.json");

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};
/*
 * Takes a single package.json key and outputs the keys of the corresponding
 * object value.
 *
 * DepType = enum { npm, custom }
 * TDepItem = {type: DepType, name: string, val: string}
 *
 * input: string
 * output: TDepItem[]
 */
const getDeps = (packageKey) => {
  if (!package[packageKey]) {
    return [];
  }
  const result = [];
  const deps = package[packageKey];
  Object.keys(deps).forEach((depName) => {
    const isValidUrl = isValidHttpUrl(deps[depName]);
    result.push({
      type: isValidUrl ? "custom" : "npm",
      name: depName,
      val: deps[depName],
      url: isValidUrl ? deps[depName] : `https://npmjs.com/package/${depName}`,
    });
  });
  return result;
};

/*
 * Takes an array of package.json string keys to collate
 * the keys of the corresponding object values. Useful
 * for programmatically getting a single list from multiple
 * top-level keys.
 *
 * DepType = enum { npm, custom }
 * TDepItem = {type: DepType, name: string, val: string}
 *
 * input: string[]
 * output: TDepItem[]
 */
const collateDeps = (packageKeys) => {
  let resultList = [];
  packageKeys.forEach((innerKey) => {
    resultList = resultList.concat(getDeps(innerKey));
  });
  return resultList.sort((a, b) => (a.name < b.name ? -1 : 1));
};

module.exports = {
  deps: getDeps("dependencies"),
  devDeps: collateDeps(["devDependencies", "customDependencies"]),
};
