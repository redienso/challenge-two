const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.tsx",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		contentBase: "./dist",
	},
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			title: "Apdex Board",
			template: "./src/index.html",
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /.(js|tsx?)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript",
						],
					}
				},
			}
		]
	},
};
