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
        mkdir('assets/images');
        mkdir('assets/js');
        mkdir('favicons');
        mkdir('src');
        mkdir('src/sass');
        mkdir('src/sass/components');

        // Packages
        this.template('package.json');
        this.template('bower.json');

        // Gulpfile
        this.template('gulpfile.js');

        // JS
        this.copy('assets/js/config.js', 'assets/js/config.js');
        this.copy('assets/js/theme.js', 'assets/js/' + this.themeName + '.js');

        // Libs
        this.directory('libs');

        // Sass
        this.directory('src/sass/components');
        this.copy('src/sass/theme.scss', 'src/sass/' + this.themeName + '.scss');

        // Pug
        this.directory('src/pug');

        // Assets
        this.directory('assets/fonts');
        this.directory('assets/css');

        // Docuemntation
        this.directory('src/documentation');

        // Gulp dir and mailer
        this.directory('gulp');
        this.directory('mailer');

        // Root files
        this.copy('eslintrc', '.eslintrc');
        this.copy('scss-lint.yml', '.scss-lint.yml');
        this.copy('gitignore', '.gitignore');
        this.copy('LICENSE', 'LICENSE');
    }
});
