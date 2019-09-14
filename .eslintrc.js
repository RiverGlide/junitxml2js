module.exports = {
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "extends": "eslint:recommended",
  "rules": {
    // enable additional rules
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-trailing-spaces": ["error"],
    "eol-last": ["error", "always"],

    // override default options for rules from base configurations
    "no-cond-assign": ["error", "always"],
  }
}
