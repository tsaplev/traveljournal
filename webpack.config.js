const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getHtmlData } = require("./src/fetchers/data");

module.exports = async (env) => {
  const htmlData =
    env && env.demo ? require("./demo-data.json") : await getHtmlData();

  return {
    entry: {
      main: [path.resolve(__dirname, "src/index.js")],
    },
    output: {
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: true,
        template: "src/index.html",
        ...htmlData,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "assets"),
            to: path.resolve(__dirname, "dist/assets"),
          },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: ["...", new CssMinimizerPlugin()],
    },
  };
};
