const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    index: path.join(__dirname, "client", "index.js"),
  },
  output: {
    clean: true,
    filename: "index.js",
    path: path.resolve(__dirname, "server", "public"),
    publicPath: "",
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@client": path.resolve(__dirname, "client"),
    },
    extensions: ["js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "title",
    }),
    new MiniCssExtractPlugin({ filename: "index.css" }),
  ],
};
