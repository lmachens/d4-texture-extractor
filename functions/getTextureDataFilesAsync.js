const { options } = require('../options');
const fs = require('fs/promises');
const path = require('path');

async function getTextureDataFilesAsync(){
    // As of game version 2.5.0, texture definitions are read from d4data JSON files
    const files = await fs.readdir(options.d4dataTextureFolder);
    // Return .tex names (without .json extension) for compatibility with existing code
    return files
        .filter(file => file.endsWith('.tex.json'))
        .map(file => file.replace('.json', ''));
}

module.exports = getTextureDataFilesAsync;