'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdir = require('mkdirp');

module.exports = generators.Base.extend({
    prompting: function prompting () {
        this.log(yosay('Lets fucking do this.'));

        return this.prompt([{
            type: 'input',
            name: 'themeName',
            message: 'How should we call this theme?',
            default: this.appname
        }, {
            type: 'confirm',
            name: 'installDependenciesPrompt',
            message: 'Would you like to run npm, bower and composer install?'
        }]).then(function (answer) {
            this.themeName = answer.themeName;
            this.installDependenciesPrompt = answer.installDependenciesPrompt;
        }.bind(this));
    },

    writing: function writing () {
        mkdir('assets');
        mkdir('assets/build');
        mkdir('assets/config');
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

        this.copy('src/sass/theme.scss', 'src/sass/' + this.themeName + '.scss');

        this.directory('src/jade');
        this.directory('gulp');
        this.directory('mailer');

        this.copy('eslintrc', '.eslintrc');
        this.copy('scss-lint.yml', '.scss-lint.yml');
        this.copy('gitignore', '.gitignore');
        this.copy('LICENSE', 'LICENSE');
    },

    install: function install () {
        if (this.installDependenciesPrompt) {
            this.npmInstall([
                'bourbon',
                'css-mqpacker',
                'cssnano',
                'gulp',
                'gulp-concat',
                'gulp-cssnano',
                'gulp-imagemin',
                'gulp-jade',
                'gulp-jsbeautifier',
                'gulp-postcss',
                'gulp-rename',
                'gulp-replace',
                'gulp-sass',
                'gulp-sourcemaps',
                'gulp-uglify',
                'gulp-zip',
                'imagemin-pngquant'
            ], {'saveDev': true});

            this.bowerInstall([
                'materialize',
                'owl.carousel',
                'ajax-navi'
            ], {'save': true});

            this.spawnCommand('composer', ['install']);
        }
    }
});
