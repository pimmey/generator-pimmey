(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {
        return function () {
            return gulp.src([
                    '**',
                    '!bower_components/**',
                    '!bower_components',
                    '!node_modules/**',
                    '!node_modules',
                    '!' + GLOBAL.dirs.themeforest + '**',
                    '!' + GLOBAL.dirs.themeforest,
                    '!mailer/config.php'
                ])
                .pipe(gulp.dest(GLOBAL.dirs.themeforest + 'build'));
        }
    }
})();
