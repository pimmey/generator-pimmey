'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdir = require('mkdirp');

module.exports = generators.Base.extend({
    prompting: function prompting () {
        this.log(yosay('Let us fucking do this.'));

        return this.prompt([{
            type: 'input',
            name: 'themeName',
            message: 'How should we call this theme?',
            default: this.appname
        }]).then(function (answer) {
            this.themeName = answer.themeName;
        }.bind(this));
    },

    writing: function writing () {
        mkdir('assets');
        mkdir('assets/css');
        mkdir('assets/fonts');
        mkdir('assets/images');
        mkdir('assets/js');
        mkdir('favicons');
        mkdir('src');
        mkdir('src/sass');
        mkdir('src/sass/components');

        this.template('package.json');
        this.template('bower.json');
        this.template('composer.json');
        this.template('gulpfile.js');

        this.copy('assets/js/config.js', 'assets/js/config.js');
        this.copy('assets/js/theme.js', 'assets/js/' + this.themeName + '.js');
        this.copy('src/sass/theme.scss', 'src/sass/' + this.themeName + '.scss');

        this.directory('src/pug');
        this.directory('src/documentation');
        this.directory('gulp');
        this.directory('mailer');

        this.copy('eslintrc', '.eslintrc');
        this.copy('scss-lint.yml', '.scss-lint.yml');
        this.copy('gitignore', '.gitignore');
        this.copy('LICENSE', 'LICENSE');
    }
});
