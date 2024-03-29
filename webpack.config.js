/* global __dirname */
const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    open: true,
    historyApiFallback: true,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.css$/i,
        use: [`style-loader`, `css-loader`],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: `file-loader`,
        },
      },
    ],
  },
  devtool: `source-map`
};
