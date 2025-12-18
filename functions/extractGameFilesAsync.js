const runCommand = require("./runCommand");
const { options } = require("../options");
const logger = require("./logger");
const fs = require("fs-extra");
const path = require("path");

async function extractGameFilesAsync() {
  // Note: CASC uses uppercase "Base" in the path
  const baseFolder = path.join(options.gameDataFolder, "Base");
  if (fs.existsSync(baseFolder)) await fs.remove(baseFolder);

  // As of game version 2.5.0:
  // - Texture definitions are now in a single Texture-Base-Global.dat file
  // - We use d4data JSON files instead (already parsed by d4data repo)
  // - Only payload textures need to be extracted from CASC

  // Extract payload textures for each filter pattern
  // Note: CASCConsole wildcard matching requires patterns without path prefix
  // The pattern "*filter*" will extract matching files from all paths
  for (const filter of options.filters) {
    logger.log("extracting game textures: " + filter);
    runCommand(
      `"${options.cascConsolePath}" -m Pattern -e "*${filter}*" -d "${options.gameDataFolder}" -l All -p ${options.storage} -s "${options.gameFolder}"`
    );
  }
}

module.exports = extractGameFilesAsync;
