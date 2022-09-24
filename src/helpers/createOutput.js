function createOutput(code, data) {
  return {
    status: code,
    data,
  };
}

module.exports = createOutput;
