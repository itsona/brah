const path = require("path");
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	outputDir: process.env.VUE_APP_TEMP_BUILD_DIR,
	//Optimisations
	chainWebpack(config) {
		config.plugins.delete("prefetch");
		// and this line
		config.plugin("CompressionPlugin").use(CompressionPlugin);
	},
	lintOnSave: true,
	devServer: {
		port: 8080,
		// proxy: process.env.VUE_APP_API_URL,
		//host: 'localhost',
		//public:
		//disableHostCheck: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: false,
			ignored: [/node_modules/, /dist/],
		},
	},
	configureWebpack: {
		devtool: "source-map",
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@js": path.resolve(__dirname, "./src/js"),
				"@views": path.resolve(__dirname, "./src/views"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@lang": path.resolve(__dirname, "./src/lang"),
			},
			extensions: [".js", ".vue", ".json"],
		},
		watchOptions: {
			poll: false,
			ignored: /node_modules/,
		},
		plugins: [new VuetifyLoaderPlugin()],
		module: {
			rules: [
				{
					exclude: /node_modules/,
				},
			],
			//loaders: [
			//  { test: /\.css$/, loader: "css-loader" }
			//]
		},
	},
};
