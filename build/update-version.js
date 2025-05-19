// update-versions.js
import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// get version from the root package.json
const rootPackage = JSON.parse(
  readFileSync(join(import.meta.dirname, '../package.json'), 'utf8')
);

const version = rootPackage.version;
console.log(`Updating all packages to version ${version}`);

// update all package.json files in the packages directory
const dirs = readdirSync('./packages');
dirs.forEach((dir) => {
  const pkgPath = join(import.meta.dirname, '../packages', dir, 'package.json');

  if (!existsSync(pkgPath)) {
    return;
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  pkg.version = version;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

  console.log(`Updated ${pkgPath} to version ${version}`);
});

// update extension manifest file
const manifestPath = join(
  import.meta.dirname,
  '../packages/extension/extension/manifest.json'
);
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.version = version;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Updated ${manifestPath} to version ${version}`);
}
