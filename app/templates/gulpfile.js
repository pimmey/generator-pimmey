'use strict';

var GLOBAL = {
    dirs: {
        gulp: './gulp/',
        sass: './src/sass/',
        jade: './src/jade/',
        assets: './assets/',
        css: './assets/css/',
        libs: './libs/',
        themeforest: './themeforest/'
    },
    themeName: '<%= themeName %>'
};

var gulp = require('gulp');

gulp.task('sass', require(GLOBAL.dirs.gulp + 'sass')(GLOBAL, gulp));
gulp.task('build', require(GLOBAL.dirs.gulp + 'build')(GLOBAL, gulp));
gulp.task('jade', require(GLOBAL.dirs.gulp + 'jade')(GLOBAL, gulp));
gulp.task('watch', require(GLOBAL.dirs.gulp + 'watch')(GLOBAL, gulp));
gulp.task('imagemin', require(GLOBAL.dirs.gulp + 'imagemin')(GLOBAL, gulp));

gulp.task('themeforest', ['themeforest:build'], function () {
    gulp.start(['themeforest:pixelate', 'themeforest:mailconfig']);
});

gulp.task('themeforest:build', require(GLOBAL.dirs.gulp + 'themeforest/build')(GLOBAL, gulp));
gulp.task('themeforest:pixelate', require(GLOBAL.dirs.gulp + 'themeforest/pixelate')(GLOBAL, gulp));
gulp.task('themeforest:mailconfig', require(GLOBAL.dirs.gulp + 'themeforest/mailconfig')(GLOBAL, gulp));

gulp.task('themeforest:zip', require(GLOBAL.dirs.gulp + 'themeforest/zip')(GLOBAL, gulp));
