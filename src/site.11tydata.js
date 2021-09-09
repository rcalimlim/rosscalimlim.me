const package = require("../package.json");

const getDeps = (prop) => {
  const vals = Object.keys(package[prop]);
  return vals.length > 0 ? vals : [];
};

module.exports = {
  deps: getDeps("dependencies"),
  devDeps: getDeps("devDependencies"),
};
