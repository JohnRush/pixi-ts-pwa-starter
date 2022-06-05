const path = require('path');
const fs = require('fs');

function findFile(root, file) {
  const files = fs.readdirSync(root);
  if (files.indexOf(file) !== -1) {
    return path.join(root, file);
  }
}

function patchFile(filename, find, replace) {
  if (filename) {
    const body = fs.readFileSync(filename, 'utf8');
    const altered = body.replace(find, replace);
    if (altered && altered.length && altered != body) {
      fs.writeFileSync(filename, altered, 'utf8');
      console.log('patched', filename);
      return true;
    }
  }
  return false;
}

const htmlMetaMatch = (key) =>
  new RegExp(`(\\w*<meta\\s*name="${key}"\\s*content=")(.*)("\\s*\\/>)`);

function changeThemeColor(root, cssColorHex) {
  patchFile(
    findFile(root, 'index.html'),
    htmlMetaMatch('theme-color'),
    `$1${cssColorHex}$3`
  );

  patchFile(
    findFile(path.join(root, 'public'), 'manifest.json'),
    /("theme_color"\s*:\s*")(#[0-9a-fA-F]{6})(".*)/,
    `$1${cssColorHex}$3`
  );

  patchFile(
    findFile(path.join(root, 'public'), 'manifest.json'),
    /("background_color"\s*:\s*")(#[0-9a-fA-F]{6})(".*)/,
    `$1${cssColorHex}$3`
  );
}

function changeTitle(root, title) {
  patchFile(
    findFile(root, 'index.html'),
    /(\w*<title>)(.*)(<\/title>.*)/,
    `$1${title}$3`
  );

  patchFile(
    findFile(root, 'index.html'),
    htmlMetaMatch('apple-mobile-web-app-title'),
    `$1${title}$3`
  );
}

function changeShortName(root, name) {
  patchFile(
    findFile(path.join(root, 'public'), 'manifest.json'),
    /("short_name"\s*:\s*")(.*)(".*)/,
    `$1${name}$3`
  );
}

function changeDescription(root, description) {
  patchFile(
    findFile(root, 'index.html'),
    htmlMetaMatch('description'),
    `$1${description}$3`
  );
  patchFile(
    findFile(path.join(root, 'public'), 'manifest.json'),
    /("description"\s*:\s*")(.*)(".*)/,
    `$1${description}$3`
  );
}

const settings = {
  ThemeColor: '#F0F0F0',
  Title: 'PWA Starter App',
  Description: 'A starter template for a cross-platform PWA application.',
  Short: 'Pixi PWA',
};

const rootPath = path.resolve('.');
changeThemeColor(rootPath, settings.ThemeColor);
changeTitle(rootPath, settings.Title);
changeDescription(rootPath, settings.Description);
changeShortName(rootPath, settings.Short);
