'use strict';
var generators = require('yeoman-generator');
var mkdir = require('mkdirp');
var fs = require('fs');

module.exports = generators.Base.extend({
    prompting: function prompting () {
        return this.prompt([{
            type: 'input',
            name: 'themeName',
            message: 'Input theme name',
            default: this.appname
        }]).then(function (answer) {
            this.themeName = answer.themeName
        }.bind(this));
    },

    app: function app () {
        mkdir('assets');
        mkdir('favicons');
        mkdir('gulp');
        mkdir('mailer');
        mkdir('src');
        mkdir('src/jade');
        mkdir('src/sass');
        mkdir('src/sass/components');

        this.template('src/sass/theme.scss', 'src/sass/' + this.themeName + '.scss');

        this.copy('gulpfile.js', 'gulpfile.js').on('end', function () {
            this._modifyGulpFile();
        });
    },

    _modifyGulpFile: function _modifyGulpFile () {
        var self = this;
        var gulpfile = 'gulpfile.js';

        fs.readFile(gulpfile, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            var result =  data.replace(/themeName: 'theme'/, 'themeName: \'' + self.themeName + '\'');

            fs.writeFile(gulpfile, result, 'utf8', function (err) {
                if (err) {
                    return console.log(err);

                }
            });
        });
    },

    codeQualityTools: function codeQualityTools () {
        this.copy('eslintrc', '.eslintrc');
        this.copy('scss-lint.yml', '.scss-lint.yml');
    }
});
