module.exports = {
  parser: "babel-eslint",
  extends: 'standard',
  env: {
    jest : true
  }
  globals: {
    // browser
    document: false,
    navigator: false,
    window: false,
    // node
    __dirname: true,
    require: true,
    process: true,
    console: true,
    module: true
  }
};
