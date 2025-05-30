import fs from 'node:fs';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

// read content of "demo/demo.js"
const demoSourceRaw = fs.readFileSync('demo/demo.js', 'utf-8');

// Custom plugin to inject demoSourceRaw into index.base.html
function injectDemoSource() {
  return {
    name: 'inject-demo-source',
    generateBundle() {
      const htmlPath = 'demo/index.base.html';
      const outPath = 'demo/index.html';
      let html = fs.readFileSync(htmlPath, 'utf-8');
      html = html.replace(
        '{{demoSource}}',
        demoSourceRaw.replace(
          /[&<>]/g,
          (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])
        )
      );
      fs.writeFileSync(outPath, html);
    },
  };
}

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.ts'],
        exclude: 'node_modules/**',
      }),
    ],
  },
  {
    input: 'demo/demo.js',
    output: {
      file: 'demo/demo-bundle.js',
      format: 'es',
      name: 'ImmutableDevToolsDemo',
    },
    plugins: [nodeResolve(), injectDemoSource()],
  },
];

export default config;
