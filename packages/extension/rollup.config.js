import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
  input: 'index.js',
  output: {
    file: 'extension/immutable-object-formatter.js',
    format: 'es',
  },
  plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' })],
};

export default config;
