var config = {
  entry: ['./client/app.js'],
  resolve: { alias: {} },
  output: {
    path: './client/build',
    filename: 'bundle.js'
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|server/,
        query: {
          presets: ['react']
        }
      }
    ]
  }
};

module.exports = config;