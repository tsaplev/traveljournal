const utils = jest.requireActual("../utils");

jest.mock("./utils");

const queryAllRows = jest.fn();

module.exports = {
  ...utils,
  queryAllRows,
};
