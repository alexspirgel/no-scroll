const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const packageData = require('./package.json');

module.exports = [
	{
		mode: 'production',
		name: 'noScroll',
		entry: './src/index.js',
		target: 'web',
		output: {
			library: 'noScroll',
			libraryTarget: 'var',
			filename: 'no-scroll.js',
			path: path.resolve(__dirname, './dist')
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `no-scroll v${packageData.version}\nhttps://github.com/alexspirgel/no-scroll`
			})
		],
		optimization: {
			minimize: false
		},
		watch: true
	},
	{
		mode: 'production',
		name: 'noScroll',
		entry: './src/index.js',
		target: 'web',
		output: {
			library: 'noScroll',
			libraryTarget: 'var',
			filename: 'no-scroll.min.js',
			path: path.resolve(__dirname, './dist')
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
		watch: true
	}
];