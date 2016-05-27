(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {
        return function () {
            gulp.watch([
                GLOBAL.dirs.sass + '*.scss',
                GLOBAL.dirs.sass + 'skins/*.scss'
            ], ['sass']);
            gulp.watch([
                GLOBAL.dirs.jade + '*.jade',
                GLOBAL.dirs.jade + '**/*.jade'
            ], ['jade']);
        }
    }
})();
