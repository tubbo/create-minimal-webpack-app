#!/usr/bin/env node

const ChildProcess = require('child_process')
const path = require('path')
const fs = require('fs')
const config = require('./src/config.js')

const name = process.argv[2]
const root = process.cwd()
const dir = path.join(root, name)

function copy(file, dest) {
  const source = path.join(__dirname, 'src', file)
  dest = dest || file
  const destination = path.join(dir, dest)
  const content = fs.readFileSync(source)

  fs.writeFileSync(destination, content)
}

async function generate() {
  fs.mkdirSync(dir)
  fs.mkdirSync(path.join(dir, 'src'))
  fs.mkdirSync(path.join(dir, 'public'))
  process.chdir(dir)

  ChildProcess.execSync('yarn init -yp')
  ChildProcess.execSync(`yarn add ${config.dependencies} -D`)

  const json = require(`${dir}/package.json`)
  const pkg = Object.assign({}, json)

  pkg.app = {
    title: "Web Site"
  }
  pkg.scripts = config.scripts
  pkg.eslintConfig = config.eslintConfig
  pkg.stylelint = config.stylelint

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
  fs.writeFileSync('.gitignore', "node_modules\ndist")

  copy('index.html')
  copy('index.js', 'src/index.js')
  copy('index.css', 'src/index.css')
  copy('webpack.config.js')

  // add favicon
  copy('favicon.ico', 'public/favicon.ico')
  copy('android-chrome-192x192.png', 'public/android-chrome-192x192.png')
  copy('android-chrome-512x512.png', 'public/android-chrome-512x512.png')
  copy('favicon-16x16.png', 'public/favicon-16x16.png')
  copy('favicon-32x32.png', 'public/favicon-32x32.png')
  copy('site.webmanifest', 'public/site.webmanifest')

}

generate()
module.exports = generate
