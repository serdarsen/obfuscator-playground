const WebpackObfuscator = require('webpack-obfuscator');
const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  devServer: {
    port: 5000,
    open: false,
    hot: true,
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            enforce: 'post',
            use: { 
                loader: WebpackObfuscator.loader, 
                options: {
                    rotateStringArray: true
                }
            }
        }
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
  ],
};

if (currentTask === "build") {
  config.mode = "production";

  config.plugins.push(
    new WebpackManifestPlugin(),
    new WebpackObfuscator({
        rotateStringArray: true
    })
  );
}

module.exports = config;
