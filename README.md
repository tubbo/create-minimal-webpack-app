# create-minimal-webpack-app

A minimal site generator using [Webpack][] and friends.

## Features

- **HTML::** The `index.html` file is generated and automatically
  includes Webpack CSS/JS bundles. It also can optionally include
  configured data passed down from `package.json`
- **CSS:** Your CSS is run through the Webpack pipeline for processing,
  and extracted to a `main.css` file for inclusion in the browser.
- **JavaScript:** No need to worry about compatibility in browsers, your
  code will be transpiled from ES2015 into something they can
  understand.
- **Assets:** Webpack is configured to load image/font assets as URLs,
  so you can use them in your JS/CSS with ease. Additionally, the
  `public/` directory is populated with favicons and other files that
  are served statically.
- **Linting:** [ESLint][] and [Stylelint][] are automatically configured
  with recommended JS/CSS settings, and some additional helper rules.
  This can be found in the `package.json` for later editing.
- **Development:** [Webpack Dev Server][] is installed so you can get to
  coding right away. It automatically reloads modules that change,
  so you can see changes without needing to refresh.
- **Deployment:** The `yarn deploy` task starts you off right, building
  your app and deploying the `dist/` directory to [Surge][].

## Usage

With Yarn:

    yarn create minimal-webpack-app your-app-name

With NPM:

    npm install create-minimal-webpack-app
    create-minimal-webpack-app your-app-name

You'll get an application directory with the following contents:

    your-app-name
    ├── index.html
    ├── package.json
    ├── public
    │   ├── android-chrome-192x192.png
    │   ├── android-chrome-512x512.png
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   ├── favicon.ico
    │   └── site.webmanifest
    ├── src
    │   ├── index.css
    │   └── index.js
    ├── webpack.config.js
    └── yarn.lock

    2 directories, 12 files

This will get you going with the bare minimum necessary to start
developing.

Start the server by running:

    yarn start

To run lint checks:

    yarn lint

You can also build the application to `dist/`:

    yarn build

Or, deploy to [Surge][] using a random domain:

    yarn deploy

**NOTE:** This will change domain names each time unless you pass a
`-d your-original-domain.surge.sh` the next time you deploy.

## Configuration

To configure the title of the app, edit `app.title` from
**package.json**:

```json
{
  "app": {
    "title": "Your App Name"
  }
}
```

You can use this object to pass additional configuration to your HTML:

```json
{
  "app": {
    "title": "Your App Name",
    "heading": "Hello World"
  }
}
```

Read it out using EJS tags:

```html
<h1><%= htmlWebpackPlugin.options.heading %></h1>
```

[Webpack]: https://webpack.js.org
[ESLint]: https://eslint.js.org
[Stylelint]: https://stylelint.org
[Webpack Dev Server]: https://webpack.js.org/configuration/dev-server/
[Surge]: https://surge.sh
