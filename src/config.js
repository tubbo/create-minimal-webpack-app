module.exports = {
  dependencies: [
    'eslint',
    'babel-eslint',
    'css-loader',
    'file-loader',
    'html-webpack-plugin',
    'mini-css-extract-plugin',
    'style-loader',
    'stylelint',
    'stylelint-config-recommended',
    'surge',
    'url-loader',
    'webpack',
    'webpack-cli',
    'webpack-dev-server'
  ].join(' '),
  scripts: {
    "build": "webpack --mode production",
    "start": "webpack-dev-server",
    "deploy": "yarn build && surge -p ./dist",
    "lint": "eslint src/**/*.js && stylelint src/**/*.css"
  },
  eslintConfig: {
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module"
    },
    "extends": "eslint:recommended",
    "rules": {
      "indent": [
        "error",
        2
      ],
      "keyword-spacing": [
        "error",
        {
          "before": true
        }
      ],
      "semi": [
        "error",
        "never"
      ],
      "eqeqeq": [
        "error",
        "always"
      ]
    }
  },
  stylelint: {
    "extends": "stylelint-config-recommended"
  }
}
