const path = require('path');
const fs = require('fs');

const htmlMetaMatch = (metaName) =>
  new RegExp(`(\\w*<meta\\s*name="${metaName}"\\s*content=")(.*)("\\s*\\/>)`);

const htmlTagMatch = (tag) => new RegExp(`(\\w*<${tag}>)(.*)(<\\/${tag}>.*)`);

function jsonPatch(src, property, value) {
  if (
    !src ||
    !property ||
    !value ||
    typeof src !== 'object' ||
    typeof property !== 'string' ||
    typeof value !== 'string'
  ) {
    return false;
  }

  if (!(property in src) || src[property] != value) {
    src[property] = value;
    return true;
  }

  return false;
}

function patchSwaCliJson(root, { ProjectName, Title }) {
  const filename = path.join(root, 'swa-cli.config.json');
  if (fs.existsSync(filename)) {
    const payload = fs.readFileSync(filename, 'utf8');
    const src = JSON.parse(payload);

    const cfg = src?.configurations?.main;
    let mod = jsonPatch(cfg, 'projectName', ProjectName);
    mod = jsonPatch(cfg, 'resourceGroupName', ProjectName) || mod;
    mod = jsonPatch(cfg, 'appName', Title) || mod;

    if (mod) {
      const payload = JSON.stringify(src, null, 2);
      fs.writeFileSync(filename, payload);
      console.log(`Patched ${filename}`);
    }
  }
}

function patchManifestJson(root, { Title, Short, ThemeColor, Description }) {
  const filename = path.join(root, 'public', 'manifest.json');
  if (fs.existsSync(filename)) {
    const payload = fs.readFileSync(filename, 'utf8');
    const src = JSON.parse(payload);

    let mod = jsonPatch(src, 'name', Title);
    mod = jsonPatch(src, 'short_name', Short) || mod;
    mod = jsonPatch(src, 'theme_color', ThemeColor) || mod;
    mod = jsonPatch(src, 'background_color', ThemeColor) || mod;
    mod = jsonPatch(src, 'description', Description) || mod;

    if (mod) {
      const payload = JSON.stringify(src, null, 2);
      fs.writeFileSync(filename, payload);
      console.log(`Patched ${filename}`);
    }
  }
}

function patchPackageJson(root, { ProjectName, Description }) {
  const filename = path.join(root, 'package.json');
  if (fs.existsSync(filename)) {
    const payload = fs.readFileSync(filename, 'utf8');
    const src = JSON.parse(payload);

    let mod = jsonPatch(src, 'name', ProjectName);
    mod = jsonPatch(src, 'description', Description) || mod;

    if (mod) {
      const payload = JSON.stringify(src, null, 2);
      fs.writeFileSync(filename, payload);
      console.log(`Patched ${filename}`);
    }
  }
}

function patchPackageLockJson(root, { ProjectName }) {
  const filename = path.join(root, 'package-lock.json');
  if (fs.existsSync(filename)) {
    const payload = fs.readFileSync(filename, 'utf8');
    const src = JSON.parse(payload);

    let mod = jsonPatch(src, 'name', ProjectName);
    mod = jsonPatch(src.packages[''], 'name', ProjectName) || mod;

    if (mod) {
      const payload = JSON.stringify(src, null, 2);
      fs.writeFileSync(filename, payload);
      console.log(`Patched ${filename}`);
    }
  }
}

function patchIndexHtml(root, { ThemeColor, Description, Title }) {
  const filename = path.join(root, 'index.html');
  if (fs.existsSync(filename)) {
    const payload = fs.readFileSync(filename, 'utf8');

    let mod = payload.replace(
      htmlMetaMatch('theme-color'),
      `$1${ThemeColor}$3`
    );
    mod = mod.replace(htmlMetaMatch('description'), `$1${Description}$3`);

    mod = mod.replace(htmlTagMatch('title'), `$1${Title}$3`);
    mod = mod.replace(
      htmlMetaMatch('apple-mobile-web-app-title'),
      `$1${Title}$3`
    );

    if (mod !== payload) {
      fs.writeFileSync(filename, mod, 'utf8');
      console.log(`Patched ${filename}`);
    }
  }
}

const settings = {
  ThemeColor: '#F0F0F0',
  Title: 'PWA Starter App',
  Description: 'A starter template for a cross-platform PWA application.',
  Short: 'Pixi PWA',
  ProjectName: 'pixi-pwa-starter',
};

const rootPath = path.resolve('.');
patchSwaCliJson(rootPath, settings);
patchManifestJson(rootPath, settings);
patchPackageJson(rootPath, settings);
patchPackageLockJson(rootPath, settings);
patchIndexHtml(rootPath, settings);
