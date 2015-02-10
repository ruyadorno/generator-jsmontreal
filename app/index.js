'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the doozie' + chalk.red('Jsmontreal') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?'
    }];

    this.prompt(prompts, function (props) {
      this.userOpts = props;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {

      var files = {
        'package.json': '_package.json',
        'bower.json': '_bower.json',
        'index.html': 'index.html'
      };

      Object.keys(files).forEach(function (key) {
        this.fs.copyTpl(
          this.templatePath(files[key]),
          this.destinationPath(key),
          this.userOpts
        );
      }, this);
    },

    config: function () {
      this.config.set('projectName', this.userOpts.projectName);
      this.config.save();
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    media: function () {
      this.fs.copy(
        this.templatePath(path.join('img','rio.jpg')),
        this.destinationPath(path.join('img','rio.jpg'))
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
