module.exports = {
  extends: 'standard',
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
    module: true,
    // jest
    describe: true,
    it: true,
    expect: true,
    beforeAll: true,
    beforeEach: true,
    afterAll: true,
    afterEach: true
  }
};
