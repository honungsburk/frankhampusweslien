module.exports = {
  preset: "vite-jest",
  testMatch: ["<rootDir>/firebase-rules-test/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css|sass|scss)$": "identity-obj-proxy",
  },
};
