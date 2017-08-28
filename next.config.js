const path = require('path')
const ROOT_PATH = path.resolve(__dirname);

const babelLoader = {
  loader: 'babel-loader',
  options: {}
}

const emitLoader = {
  loader: 'emit-file-loader',
  options: {
    name: 'dist/[path][name].js'
  }
}

const typescriptLoader = {
  test: /\.tsx?$/,
  use: [
    emitLoader,
    babelLoader,
    'ts-loader'
  ],
  exclude: /node_modules/,
  include: [
    __dirname,
    path.join(__dirname, 'pages'),
    path.join(__dirname, 'app'),
  ]
}

module.exports = {
  // Add typescript extensions
  pagesExtensions: [
    'js',
    'json',
    'ts',
    'tsx'
  ],
  webpack: (config) => {
    config.resolve.alias = {
      'components': __dirname + '/app/components',
      'containers': __dirname + '/app/containers'
    }
    // Resolve to next babel-loader options
    let {
      options
    } = config.module.rules.find((x) => x.loader === 'babel-loader')
    babelLoader.options = options

    // Resolve to next emit-file-loader options
    let {
      transform
    } = config.module.rules.find((x) => x.loader === 'emit-file-loader').options
    emitLoader.options.transform = transform

    // Add typescript rules
    config.module.rules = config.module.rules.concat(typescriptLoader)

    return config
  }
}

