import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import { uglify } from 'rollup-plugin-uglify'

export default {
  // tell rollup which libraries it can expect to be present externally
  external: ['path', 'fs'],
  // input file for building the bundle
  input: 'src/main.js',
  // output bundle file
  output: {
    file: 'dist/main.js',
    format: 'cjs' // usually the best choice
    // add banner for command line tool
    /* banner: "#! /usr/bin/env node" */
  },
  plugins: [
    progress(),
    // add rollup-plugin-node-resolve plugin here if libraries should be bundled together, but you really shouldnt
    // also add rollup-plugin-commonjs if the libraries are in commonjs format, but you really really shouldnt
    babel({
      /*
      * Babel has to be configured separately for rollup, because we cannot use module transformers with it, which
      * in turn are required by Jest, which will read its configuration from .babelrc
      */
      babelrc: false,
      presets: [['env', { modules: false }], 'flow'],
      plugins: [
        'external-helpers',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }),
    uglify(),
    filesize()
  ]
}
