const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const DotEnv = require("dotenv-webpack");
const WebpackObfuscator = require('webpack-obfuscator');
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const WebpackObfuscatorOptions = {
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.3,

    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.1,

    identifierNamesGenerator: 'hexadecimal',

    numbersToExpressions: true,

    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: 'safe',

    selfDefending: true,

    splitStrings: true,
    splitStringsChunkLength: 5,
    shuffleStringArray: true,
    rotateStringArray: true,
    stringArray: true,
    stringArrayThreshold: 0.6,
}

const config = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.[contenthash].js",
  },
  devServer: {
    port: 4000,
    open: false,
    hot: true,
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            enforce: 'post',
            use: [
                { 
                    loader: WebpackObfuscator.loader, 
                    options: WebpackObfuscatorOptions
                },
                {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", {
                                runtime: "automatic",
                            }],
                        ],
                    },
                }
            ]
        },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    new DotEnv(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
  ],
};

if (currentTask === "build") {
  config.mode = "production";

  config.plugins.push(
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new WebpackObfuscator(WebpackObfuscatorOptions)
  );
}

module.exports = config;
