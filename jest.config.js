module.exports = {
  setupFilesAfterEnv: [`./src/jest.setup.js`],
  snapshotSerializers: [`enzyme-to-json/serializer`],
  moduleNameMapper: {
    "\\.(css|less)$": `identity-obj-proxy`
  },
};
