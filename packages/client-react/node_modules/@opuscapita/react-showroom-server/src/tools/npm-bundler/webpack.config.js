module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(css|less)$/,
        loader: `style!css?modules&importLoaders=1&` +
        `localIdentName=[name]__[local]__[hash:base64:3]` +
        `!postcss-loader!less?sourceMap`,
        include: /\.module\.(css|less)$/
      },
      {
        test: /\.(css|less)$/,
        loader: `style!css!postcss-loader!less?sourceMap`,
        exclude: /\.module\.(css|less)$/
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
