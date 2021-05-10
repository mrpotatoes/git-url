/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageDirectory: "test-reports",
  testEnvironment: "node",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },

  reporters: ["default", ["jest-junit", { outputDirectory: "test-reports" }]],
  
  roots: ["<rootDir>/tests"],
  coveragePathIgnorePatterns: [],
  testPathIgnorePatterns: [],
  coverageDirectory: "test-reports",
  moduleFileExtensions: ["js"],
  moduleDirectories: ["node_modules", "lib", "bin"],
}

