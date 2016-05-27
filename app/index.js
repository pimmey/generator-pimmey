'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var mkdir = require('mkdirp');
var fs = require('fs');

module.exports = generators.Base.extend({
    welcome: function welcome () {
        this.log(yosay('Lets fucking do this.'));
    },

    prompting: function prompting () {
        return this.prompt([{
            type: 'input',
            name: 'themeName',
            message: 'Input theme name',
            default: this.appname
        }, {
            type: 'confirm',
            name: 'installDependenciesPrompt',
            message: 'Would you like to run npm and bower install?'
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
        mkdir('gulp');
        mkdir('mailer');
        mkdir('src');
        mkdir('src/jade');
        mkdir('src/sass');
        mkdir('src/sass/components');

        this.template('package.json', 'package.json');
        this.template('bower.json', 'bower.json');
        this.template('gulpfile.js', 'gulpfile.js');

        this.copy('src/sass/theme.scss', 'src/sass/' + this.themeName + '.scss');
        this.copy('src/jade/base.jade', 'src/jade/base.jade');
        this.copy('src/jade/skin-1.jade', 'src/jade/skin-1.jade');

        this.copy('eslintrc', '.eslintrc');
        this.copy('scss-lint.yml', '.scss-lint.yml');
    },

    installDependencies: function installDependencies () {
        if (this.installDependenciesPrompt) {
            this.npmInstall([
                'bourbon',
                /*'css-mqpacker',
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
                 'imagemin-pngquant'*/
            ], {'saveDev': true});

            this.bowerInstall([
                'materialize',
                /*'owl.carousel',
                 'ajaxchimp'*/
            ], {'save': true});
        } else {
            this.log('Don\'t forget to run npm & bower install');
        }
    }
});
