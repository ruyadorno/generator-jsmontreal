'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the Jsmontreal subgenerator with the argument ' + this.name + '.');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('somefile.html'),
      this.destinationPath(this.name + '.html'),
      { projectName: this.name }
    );
  }
});
