const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

const config = {
  preset: "jest-expo",
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "./jest-setup.js",
  ],
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  cacheDirectory: "./cache",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: `<rootDir>${compilerOptions.baseUrl}`,
  }),
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  // Gets mock files
  setupFiles: ["./src/__mocks__/@react-native-async-storage/async-storage.ts"],
  verbose: false,
  coveragePathIgnorePatterns: ["./app/utils/vendor"],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  transform: {
    "^.+\\.(jsx|tsx)?$": "./babel-jest.js",
  },
  collectCoverage: false,
};

module.exports = config;
