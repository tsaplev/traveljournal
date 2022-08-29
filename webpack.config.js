const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getHtmlData } = require("./src/view/data");

module.exports = async (env) => {
  const htmlData =
    env && env.demo ? require("./demo-data.json") : await getHtmlData();
  const htmlDataRu = await getHtmlData("_ru");

  return {
    entry: {
      main: [path.resolve(__dirname, "src/view/index.js")],
    },
    output: {
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      open: true,
      contentBase: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: true,
        template: "src/view/template.html",
        ...htmlData,
      }),
      new HtmlWebpackPlugin({
        minify: true,
        filename: "index_ru.html",
        template: "src/view/template.html",
        ...htmlDataRu,
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
