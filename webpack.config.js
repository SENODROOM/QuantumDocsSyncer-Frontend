const path    = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProd     = argv.mode === "production";
  const backendUrl = process.env.BACKEND_URL || "";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
        { test: /\.css$/,      use: ["style-loader","css-loader"] },
      ],
    },
    resolve: { extensions: [".js",".jsx"] },
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new webpack.DefinePlugin({
        __BACKEND_URL__: JSON.stringify(backendUrl),
        __IS_PROD__:     JSON.stringify(isProd),
      }),
    ],
    ...(isProd ? {} : {
      devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        proxy: [{ context: ["/api"], target: "http://localhost:5000" }],
      },
    }),
  };
};