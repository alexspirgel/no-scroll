const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const packageData = require('./package.json');

module.exports = [
	{
		mode: 'production',
		name: 'noScroll',
		entry: './src/scripts/index.js',
		target: 'web',
		output: {
			library: 'noScroll',
			libraryTarget: 'var',
			filename: 'no-scroll.js',
			path: path.resolve(__dirname, './dist/scripts')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `no-scroll v${packageData.version}\nhttps://github.com/alexspirgel/no-scroll`
			}),
			new WebpackNotifierPlugin({onlyOnError: true})
		],
		optimization: {
			minimize: false
		},
		watch: true
	},
	{
		mode: 'production',
		name: 'noScroll',
		entry: './src/scripts/index.js',
		target: 'web',
		output: {
			library: 'noScroll',
			libraryTarget: 'var',
			filename: 'no-scroll.min.js',
			path: path.resolve(__dirname, './dist/scripts')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `no-scroll v${packageData.version}\nhttps://github.com/alexspirgel/no-scroll`
			})
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						keep_classnames: true
					}
				})
			]
		},
		devtool: 'source-map',
		watch: true
	}
];