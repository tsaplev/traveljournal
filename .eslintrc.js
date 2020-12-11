module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier", // keep it last
  ],
  plugins: ["jest"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    document: true,
    window: true,
    fetch: false,
    google: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {},
};
