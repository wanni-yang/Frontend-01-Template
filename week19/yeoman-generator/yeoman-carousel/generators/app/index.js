var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // Next, add your custom code
      this.option('babel'); // This method adds support for a `--babel` flag
    }
    collecting(){
        this.log('collecting')
    }
    // writing(){
    //     this.fs.copyTpl(
    //         this.templatePath('package.json'),
    //         this.destinationPath('package.json'),
    //         { title: 'Templating with Yeoman' }
    //     );
    //     const pkgJson = {
    //         devDependencies: {
    //             "@babel/core": "^7.10.5",
    //             "@babel/plugin-transform-react-jsx": "^7.10.4",
    //             "@babel/preset-env": "^7.10.4",
    //             "babel-loader": "^8.1.0",
    //             "css": "^3.0.0",
    //             "css-loader": "^3.3.0",
    //             "html-webpack-plugin": "^4.5.0",
    //             "webpack": "^4.43.0",
    //             "webpack-cli": "^3.3.12",
    //             "webpack-dev-server": "^3.11.0",
    //             "@babel/register": "^7.10.5",
    //             "@istanbuljs/nyc-config-babel": "^3.0.0",
    //             "babel-loader": "^8.1.0",
    //             "babel-plugin-istanbul": "^6.0.0",
    //             "istanbul": "^0.4.5"
    //         }
    //     }
    //     this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    //     this.npmInstall();
    // }
    
    creating(){
        this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                { title: 'carousel' }
            );
        
        // 自动安装的最新的webpack 5.5.0和webpack-dev-server不兼容
        this.npmInstall([
            
            'webpack-cli',
            'webpack-dev-server',
            '@babel/core',
            '@babel/plugin-transform-react-jsx',
            '@babel/preset-env',
            'babel-loader',
            'css',
            'css-loader',
            'html-webpack-plugin',
            'mocha',
            'nyc',
            '@istanbuljs/nyc-config-babel',
            'babel-plugin-istanbul',
            '@babel/register'
        ],{'save-dev': true})
        this.fs.copyTpl(
            this.templatePath('lib/create.js'),
            this.destinationPath('lib/create.js'),

        );
        this.fs.copyTpl(
            this.templatePath('lib/gesture.js'),
            this.destinationPath('lib/gesture.js'),

        );
        this.fs.copyTpl(
            this.templatePath('lib/css-loader.js'),
            this.destinationPath('lib/css-loader.js'),

        );
        this.fs.copyTpl(
            this.templatePath('lib/animation.js'),
            this.destinationPath('lib/animation.js'),

        );
        this.fs.copyTpl(
            this.templatePath('lib/carousel.js'),
            this.destinationPath('lib/carousel.js'),

        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js'),
     
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/main.html'),
            { title: 'Templating with Yeoman' }
     
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
     
        );
        this.fs.copyTpl(
            this.templatePath('test/main.test.js'),
            this.destinationPath('test/main.test.js'),
     
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
     
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
     
        );
    }
  };