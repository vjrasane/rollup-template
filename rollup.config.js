import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import progress from "rollup-plugin-progress";
import { uglify } from "rollup-plugin-uglify";

export default {
  // tell rollup which libraries it can expect to be present externally
  external: ["path", "fs"],
  // input file for building the bundle
  input: "src/main.js",
  // output bundle file
  output: {
    file: "dist/main.js",
    format: "cjs",
    // add banner for command line tool
    /* banner: "#! /usr/bin/env node" */
  },
  plugins: [
    progress(),
    babel({
      // babel is configured here instead of the RC file which Jest uses
      babelrc: false,
      presets: [["env", { modules: false }]],
      plugins: [
        "external-helpers",
        "transform-class-properties",
        "transform-object-rest-spread"
      ]
    }),
    uglify(),
    filesize()
  ]
};
