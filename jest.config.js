const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/sample',
    '<rootDir>/apps/api',
    '<rootDir>/libs/api-interfaces',
  ],
};
