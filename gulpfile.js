const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const header = require('gulp-header');
const rename = require('gulp-rename');
const packageData = require('./package.json');

const banner = [
	'/*',
	' * no-scroll v${packageData.version}',
	' * https://github.com/alexspirgel/no-scroll',
	' */',
	''
].join('\n');

const buildStyles = () => {
	return gulp.src('./src/styles/index.scss')
		.pipe(sass().on('error', notify.onError((error) => `Error: ${error.message}`)))
		.pipe(header(banner, {packageData: packageData}))
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(rename('no-scroll.css'))
		.pipe(gulp.dest('./dist/styles'));
};

const buildStylesMinified = () => {
	return gulp.src('./src/styles/index.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(header(banner, {packageData: packageData}))
		.pipe(rename('no-scroll.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/styles'));
};

const watch = () => {
	gulp.watch('./src/**/*.scss', gulp.series(buildStyles, buildStylesMinified));
};

exports.default = gulp.series(buildStyles, buildStylesMinified, watch);