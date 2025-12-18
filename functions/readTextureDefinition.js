const fs = require('fs');
const path = require('path');
const { options } = require('../options');

function readTextureDefinition(filename) {
  // As of game version 2.5.0, texture definitions are read from d4data JSON files
  // The filename is like "2DUIMinimapIcons.tex", so we look for "2DUIMinimapIcons.tex.json"
  const jsonPath = path.join(options.d4dataTextureFolder, filename + '.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const textureDefinition = {
    eTexFormat: data.eTexFormat,
    dwVolumeXSlices: data.dwVolumeXSlices,
    dwVolumeYSlices: data.dwVolumeYSlices,
    dwWidth: data.dwWidth,
    dwHeight: data.dwHeight,
    dwDepth: data.dwDepth,
    dwFaceCount: data.dwFaceCount,
    dwMipMapLevelMin: data.dwMipMapLevelMin,
    dwMipMapLevelMax: data.dwMipMapLevelMax,
    dwImportFlags: data.dwImportFlags,
    rgbavalAvgColor: data.rgbavalAvgColor || { r: 0, g: 0, b: 0, a: 0 },
    pHotspot: data.pHotspot || { x: 0, y: 0 },
  };

  // Convert ptFrame from d4data format to expected format
  textureDefinition.ptFrame = (data.ptFrame || []).map(frame => ({
    hImageHandle: frame.hImageHandle,
    flU0: frame.flU0,
    flV0: frame.flV0,
    flU1: frame.flU1,
    flV1: frame.flV1,
  }));

  return textureDefinition;
}

module.exports = readTextureDefinition;