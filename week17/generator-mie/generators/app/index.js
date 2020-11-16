const Generator = require('yeoman-generator')

/*module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async prompting() {
    this.answers = await this.prompt([{
      type: 'input',
      name: 'title',
      message: 'Your project title',
    }])
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.title } // user answer `title` used
    );
  }
}*/
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

  }
  // async prompting() {
  //   this.dependency = await this.prompt([
  //     {
  //       type: "input",
  //       name: "name",
  //       message: "Would you like to enable the Cool feature?"
  //     }
  //   ]);
  // }

  // writing() {
  //   const pkgJson = {
  //     dependencies: {
  //       [this.dependency.name]: '*'
  //     }
  //   };

  //   // Extend or create package.json file in destination path
  //   this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  // }

  // install() {
  //   this.npmInstall();
  // }
   async prompting() {
    this.answer = await this.prompt([
      {
        type: "input",
        name: "title",
        message: "your project title?"
      }
    ]);
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answer.title }
    );
  }
};