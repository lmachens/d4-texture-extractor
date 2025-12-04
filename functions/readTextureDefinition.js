const fs = require('fs');

function readTextureDefinition(filename) {
  const buffer = fs.readFileSync(filename);
  
  const textureDefinition = {
    eTexFormat: buffer.readUInt32LE(0xc + 16),
    dwVolumeXSlices: buffer.readUInt16LE(0x10 + 16),
    dwVolumeYSlices: buffer.readUInt16LE(0x12 + 16),
    dwWidth: buffer.readUInt16LE(0x14 + 16),
    dwHeight: buffer.readUInt16LE(0x16 + 16),
    dwDepth: buffer.readUInt32LE(0x18 + 16),
    dwFaceCount: buffer.readUInt8(0x1c + 16),
    dwMipMapLevelMin: buffer.readUInt8(0x1d + 16),
    dwMipMapLevelMax: buffer.readUInt8(0x1e + 16),
    dwImportFlags: buffer.readUInt32LE(0x20 + 16),
    rgbavalAvgColor: {
      r: buffer.readFloatLE(0x28 + 16),
      g: buffer.readFloatLE(0x2C + 16),
      b: buffer.readFloatLE(0x30 + 16),
      a: buffer.readFloatLE(0x34 + 16)
    },
    pHotspot: {
      x: buffer.readInt16LE(0x38 + 16),
      y: buffer.readInt16LE(0x3a + 16)
    },
  };

  const ptFrameOffset = buffer.readUInt32LE(0x60 + 0x08) + 0x10;
  const ptFrameLength = buffer.readUInt32LE(0x60 + 0x0c);

  textureDefinition.ptFrame = parseTexFrames(buffer, ptFrameOffset, ptFrameLength);

  return textureDefinition;
}

function parseTexFrames(buffer, offset, length) {
  const texFrames = [];
  let currentOffset = offset;
  
  for (let i = 0; i < (length / 0x24); i++) {
    const texFrame = {
      hImageHandle: buffer.readUInt32LE(currentOffset),
      flU0: buffer.readFloatLE(currentOffset + 0x4),
      flV0: buffer.readFloatLE(currentOffset + 0x8),
      flU1: buffer.readFloatLE(currentOffset + 0xc),
      flV1: buffer.readFloatLE(currentOffset + 0x10),
      // unk_8081ff3: buffer.readFloatLE(currentOffset + 0x14),
      // unk_8082014: buffer.readFloatLE(currentOffset + 0x18),
      // unk_8081ff4: buffer.readFloatLE(currentOffset + 0x1c),
      // unk_8082015: buffer.readFloatLE(currentOffset + 0x20)
    };

    texFrames.push(texFrame);
    currentOffset += 0x24; // Move to the next TexFrame
  }
  
  return texFrames;
}

module.exports = readTextureDefinition;