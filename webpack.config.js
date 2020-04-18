const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entries = glob.sync("./src/**/*-entry.ts");

const config = (entry) => {
  const name = path.basename(entry, ".ts").replace("-entry", "");
  return {
    entry,
    mode: "development",
    devtool: "cheap-source-map",
    devServer: {
      contentBase: "./dist",
    },
    output: {
      filename: `${name}.js`,
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
    optimization: {
      minimize: false,
    },
    performance: {
      hints: false,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        inject: true,
      }),
    ],
  };
};

module.exports = entries.map(config);
