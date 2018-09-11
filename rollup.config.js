import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import { uglify } from 'rollup-plugin-uglify'
import fs from 'fs'

const production = process.env.NODE_ENV === 'production'

/*
* Reads dependencies from package.json and sets them as
* external dependencies so there's no need to hard code them here
*/
const pkg = JSON.parse(fs.readFileSync('./package.json'))
const ext = Object.keys(pkg.dependencies || {})

export default {
  // tell rollup which libraries it can expect to be present externally
  external: [...ext, 'path', 'fs', 'os'],
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
    /*
    * Resolve dependencies to be bundled with your code. This should
    * only be babel-runtime and everything else should be left as
    * an external dependency.
    */
    resolve(),
    babel({
      /*
      * Babel has to be configured separately for rollup, because we cannot use module transformers with it, which
      * in turn are required by Jest, which will read its configuration from .babelrc
      */
      babelrc: false,
      presets: [['env', { modules: false }], 'flow'],
      exclude: 'node_modules/**', // only transpile our source code
      runtimeHelpers: true, // otherwise transform-runtime throws an error
      plugins: [
        'external-helpers',
        'transform-runtime', // async-await requires this
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    }),
    commonjs({
      include: 'node_modules/**',
      exclude: ['src/**', 'test/**']
    }),
    production && uglify(), // uglify only in production
    filesize()
  ]
}
