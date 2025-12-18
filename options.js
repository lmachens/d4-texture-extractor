const config = require("./config");
const path = require("path");

const options = {};

function setOptions(opts) {
  options.extract = opts.extract;
  options.storage = opts.storage || config.storage || "fenris";
  options.cascConsolePath = path.resolve("./CASCConsole/CASCConsole.exe");
  options.gameDataFolder = path.resolve("./gamedata");
  // As of game version 2.5.0, texture definitions are read from d4data JSON files
  options.d4dataTextureFolder = config.d4dataTextureFolder || String.raw`C:\dev\DiabloIV\d4data\json\base\meta\Texture`;
  // Note: CASC uses uppercase "Base" in the path
  options.textureFolder = path.resolve("./gamedata/Base/payload/Texture");
  options.gameFolder = opts.gameFolder || config.gameFolder;
  options.concurrencyLimit = opts.concurrency || config.concurrencyLimit;
  options.outputFormat = opts.outputformat || config.outputFormat;
  // Support both single filter (CLI/legacy) and multiple filters (config)
  const filterInput = opts.filter || config.filters || config.filter || "*";
  options.filters = Array.isArray(filterInput) ? filterInput : [filterInput];
  options.nocrop = opts.nocrop || config.nocrop;
  options.noslice = opts.noslice || config.noslice;
  options.noslicefolders = opts.noslicefolders || config.noslicefolders;
  options.outputpath = opts.outputpath;
}

module.exports = { options, setOptions };
