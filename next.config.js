const paths = require('./server/paths')

const babelLoader = {
  loader: 'babel-loader',
  options: {},
}

const emitLoader = {
  loader: 'emit-file-loader',
  options: {
    name: 'dist/[path][name].js',
  },
}

const typescriptLoader = {
  test: /\.tsx?$/,
  use: [emitLoader, babelLoader, 'ts-loader'],
  exclude: /node_modules/,
  include: [
    paths.inRootDir('pages'),
    paths.inRootDir('app'),
  ],
}

module.exports = {
  // Add typescript extensions
  pagesExtensions: ['js', 'json', 'ts', 'tsx'],
  webpack: config => {
    // XXX must be synced with tsconfig paths
    config.resolve.alias = {
      components: paths.inRootDir('app/components'),
      containers: paths.inRootDir('app/containers'),
    }
    // Resolve to next babel-loader options
    let { options } = config.module.rules.find(x => x.loader === 'babel-loader')
    babelLoader.options = options

    // Resolve to next emit-file-loader options
    let { transform } = config.module.rules.find(
      x => x.loader === 'emit-file-loader'
    ).options
    emitLoader.options.transform = transform

    // Add typescript rules
    config.module.rules = config.module.rules.concat(typescriptLoader)

    // Image task to use images in component directory
    config.module.rules.push({
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        // using emit-file-loader just to shut up 'Cannot find module',
        // it will make copy of image in component directory
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]',
          },
        },
        // this will create image copy, that we will use,
        // output path - '/.next/static/longhash.png'
        // url - '/_next/static/longhash.png'
        {
          loader: 'url-loader',
          options: {
            outputPath: 'static/',
            publicPath: '/_next/',
            limit: 1000,
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 7,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
          },
        },
      ],
    })

    return config
  },
}
