import { exec } from 'node:child_process';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

function runBuildJs() {
  return {
    name: 'run-build-js',
    writeBundle() {
      exec('node build.js', (err, stdout, stderr) => {
        if (err) {
          console.error(stderr);
        } else {
          console.log(stdout);
        }
      });
    },
  };
}

const config = {
  input: 'index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [nodeResolve(), babel({ babelHelpers: 'bundled' }), runBuildJs()],
};

export default config;
