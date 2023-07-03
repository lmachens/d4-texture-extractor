# Diablo 4 Texture Extractor

## What it does

It converts .tex files to png, webp or jpg. Also slices the files into separate image files when applicable.

## Known Issues

- Some of the formats like `B8G8R8A8_UNORM` are not supported by `RawtexCmd`.

## Installation

1. Clone this repo (https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Clone `d4data` from https://github.com/blizzhackers/d4data
3. Download and extract `RawtexCmd.exe` from https://forum.xentax.com/viewtopic.php?t=16461
4. Download `texconv.exe` from https://github.com/microsoft/DirectXTex/releases
5. Extract texture assets from the game using `CASCExplorer`, you can download it from https://github.com/WoW-Tools/CASCExplorer/releases. After downloading and extracting, you need to add the following line to `CASCExplorer.exe.config` file:

```
    <add key="fenris" value="Diablo IV" />
```

You can find the texture files are in `base/payload/Texture` folder.

Alternatively you can download `CASCConsole` from the same URL and use the following command line to extract the textures:

Using your local copy of Diablo 4:
```
CASCConsole -m Pattern -e "Base\payload\Texture\*.tex" -d Texture -l All -p fenris -s "C:\Program Files (x86)\Diablo IV"
```

6. **Set the correct paths by editing `config.js` file.**
7. Run `npm install` in the app folder.


## Usage

```
Usage: node ./index.js [options]

Options:
  -c, --concurrency <number>   number of concurrent tasks
  -o, --outputformat <format>  png, jpg or webp
  -f, --filter <wildcard>      Wildcard to filter files to process, for example '2DUI*', no need to include .json extension, default is '*'
  -nc, --nocrop                Do not crop images to the size of the texture, useful for map textures
  -nsf, --noslicefolders       Do not use slice folders, instead save slicers to the output folder, prefixed with the file name
  -h, --help                   display help for command

Example:
  node .\index.js -f 2DUI* -c 10 -o webp
```