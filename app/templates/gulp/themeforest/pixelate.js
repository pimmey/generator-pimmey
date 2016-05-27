(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {
        return function () {
            return gulp.src(GLOBAL.dirs.themeforest + 'pixelated-images/**/*')
                .pipe(gulp.dest(GLOBAL.dirs.themeforest + '/build/assets/images'));
        }
    }
})();
