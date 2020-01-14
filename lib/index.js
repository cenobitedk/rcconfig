const path = require("path");
const envDebug = Boolean(process.env.DEBUG);

function debug() {
  envDebug && console.debug.apply(this, arguments);
}

function rcload(key, opts) {
  const options = {
    cwd: (opts && opts.cwd) || process.cwd()
  };
  const result = {
    config: undefined,
    filepath: undefined,
    isEmpty: true
  };

  const hostPkgPath = path.join(options.cwd, "package.json");
  let hostPkg;
  try {
    hostPkg = require(hostPkgPath);
  } catch (e) {
    hostPkg = false;
  }

  if (hostPkg && hostPkg.hasOwnProperty(key)) {
    result.isEmpty = false;
    result.config = hostPkg[key];
    result.file = hostPkgPath;
  } else {
    debug(`"${key}" not found in ${hostPkgPath}`);
  }

  if (result.isEmpty) {
    const files = [
      `.${key}rc`,
      `.${key}rc.json`,
      `.${key}rc.js`,
      `${key}.config.js`
    ];
    let i = 0;
    let fileName;
    let filePath;
    let config;

    while (result.isEmpty && i < files.length) {
      fileName = files[i++];
      filePath = path.join(options.cwd, fileName);
      try {
        config = require(filePath);
        result.isEmpty = false;
      } catch (e) {
        debug(`${filePath} not found.`);
      }
    }

    if (!result.isEmpty) {
      debug(`Using ${filePath}.`);
      result.file = filePath;
      const isFunction = typeof config === "function";
      result.config = isFunction ? config() : config;
    }
  }

  if (!result.isEmpty) {
    delete result.isEmpty;
  }

  return result;
}

module.exports = rcload;
