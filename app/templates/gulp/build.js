(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {

        var concat = require('gulp-concat');
        var postcss = require('gulp-postcss');
        var mqpacker = require('css-mqpacker');
        var nano = require('gulp-cssnano');
        var rename = require('gulp-rename');
        var uglify = require('gulp-uglify');

        return function () {
            console.log('Creating build.css');
            gulp.src([
                    GLOBAL.dirs.libs + 'materialize/materialize.min.css',
                    GLOBAL.dirs.libs + 'owl/owl.carousel.css',
                    GLOBAL.dirs.css + GLOBAL.themeName + '.css'
                ])
                .pipe(concat('build.css'))
                .pipe(postcss([mqpacker]))
                .pipe(nano({
                    safe: true
                }))
                .pipe(rename('build.min.css'))
                .pipe(gulp.dest(GLOBAL.dirs.assets + 'build'));

            console.log('Creating build.js');
            gulp.src([
                GLOBAL.dirs.libs + 'jquery-2.1.1.min.js',
                GLOBAL.dirs.libs + 'materialize/materialize.min.js',
                GLOBAL.dirs.libs + 'owl/owl.carousel.min.js',
                GLOBAL.dirs.libs+ 'ajaxchimp/jquery.ajaxchimp.min.js',
                GLOBAL.dirs.assets + 'config/config.js',
                GLOBAL.dirs.assets + 'js/app.js'
            ])
            .pipe(concat('build.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(GLOBAL.dirs.assets + 'build'));
        }
    }
})();
