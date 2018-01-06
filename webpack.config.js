const path = require('path');


module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
    // use: [
    //     'babel-loader'
    // ],      
      loader: 'babel-loader',
      query: {
        presets: ["react", "env"]
      }
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: "file-loader",
    }],
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};