module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true,
        "modules": true,
        "experimentalObjectRestSpread": true
      }
    },
    "extends": "airbnb",
    "plugins": [
      "react",
      "react-native",
      "jest"
    ],
    "rules": {
      "arrow-body-style": 0,
      "no-use-before-define": 0,
      "padded-blocks": ["error", {
        "classes": "always",
        "switches": "never",
        "blocks": "never",
       }],
      "global-require": 0,
      "react/forbid-prop-types": 0,
      "react/prefer-stateless-function": 0,
      "react/jsx-filename-extension": 0,
    },
    "globals": {
      "fetch": false,
      "Headers": false,
      "window": false,
      "__DEV__": false,
    },
    "env": {
      "jest/globals": true
    }
};
