module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/destructuring-assignment': 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': 'off',
    "react/jsx-props-no-spreading": "off",
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
  },
};
