const fs = require('fs')
const path = require('path')
const exec = require('child_process').execSync

beforeAll(() => {
  process.argv[2] = 'tmp'
  require('.')
})

function read(...parts) {
  const encoding = 'utf-8'

  return fs.readFileSync(path.join(__dirname, 'tmp', ...parts), { encoding })
}

test('package.json', () => {
  const pkg = JSON.parse(read('package.json'))

  expect(pkg.stylelint).toBeDefined()
  expect(pkg.eslintConfig).toBeDefined()
  expect(pkg.scripts).toBeDefined()
  expect(pkg.app).toBeDefined()
})

test('.gitignore', () => {
  const file = read('.gitignore')

  expect(file).toEqual(expect.stringContaining('dist'))
  expect(file).toEqual(expect.stringContaining('node_modules'))
})

test('index.css', () => {
  const file = read('src', 'index.css')

  expect(file).toEqual(expect.stringContaining(':root {'))
})

test('index.js', () => {
  const file = read('src', 'index.js')

  expect(file).toEqual(expect.stringContaining('import "./index.css"'))
  expect(file).toEqual(expect.stringContaining('document.addEventListener'))
})

test('index.html', () => {
  const file = read('index.html')

  expect(file).toEqual(expect.stringContaining('<html>'))
})

test('webpack.config.js', () => {
  const file = read('webpack.config.js')

  expect(file).toEqual(expect.stringContaining('MiniCssExtractPlugin.loader'))

})

test('site.webmanifest', () => {
  const file = read('public', 'site.webmanifest')

  expect(file).toEqual(expect.stringContaining('short_name'))
})

afterAll(() => exec('rm -rf tmp'))
