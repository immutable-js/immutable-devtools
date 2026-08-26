import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
  input: 'index.js',
  output: {
    file: 'extension/immutable-object-formatter.js',
    // The bundle is a content script running in the page's realm (`world: "MAIN"`),
    // and content scripts are always classic scripts. `iife` keeps every top-level
    // binding inside the bundle instead of leaking it into the page's global scope.
    format: 'iife',
  },
  plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
};

export default config;
