const utils = jest.requireActual("../utils");

const queryAllRows = jest.fn();

module.exports = {
  ...utils,
  queryAllRows,
};
