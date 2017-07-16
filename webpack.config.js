const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8087,
    hot: false
    /*
    To restart:

    ctrl-c
    then terminate
    npm start
     */
  },
  plugins: [
      new webpack.DefinePlugin({
          //production
          'process.env.NODE_ENV': JSON.stringify('production') //JSON.stringify(process.env.NODE_ENV || 'development')
      }),
  ]
};
