// import { pathsToModuleNameMapper } from "ts-jest";
// import { compilerOptions } from "./tsconfig.json";

export default {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  // preset: "react-native",
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  cacheDirectory: "./cache",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: `<rootDir>${compilerOptions.baseUrl}`,
  // }),
  setupFiles: ["<rootDir>/src/config/jest"],
  // testMatch: ["**/*.spec.ts"],
  verbose: false,
  coveragePathIgnorePatterns: ["./app/utils/vendor"],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-native|react-clone-referenced-element|react-navigation)",
  ],
  // watchman: true,
};
