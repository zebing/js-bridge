import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import url from '@rollup/plugin-url';
import typescript from '@rollup/plugin-typescript';

const external = [];
const plugins = [
  json(),
  resolve({
    extensions: [ '.ts', '.js', '.json' ]
  }),
  commonjs(),
  url(),
  typescript()
];

if (process.env.BUILD_ENV === 'production') {
  plugins.push(uglify());
}

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
  },
  external,
  plugins,
}