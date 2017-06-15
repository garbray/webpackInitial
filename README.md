# Webpack initial build

The goal of this Webpack configuration is setup a initial build process for regular projects, this build contain:

* [Babel](https://babeljs.io/) ES6 transpiler to ES5
* [eslint](http://eslint.org/) Alert you and prevent bad practices on javascript code
* [Sass]() CSS preprocessor
* [sasslint](https://github.com/sasstools/sass-lint) Alert you and prevent bad practices on SASS code
* [Mocha](http://mochajs.org/) is used for the testing framework
* [Chai](http://chaijs.com/) is used for assertions; use the [Assert API](http://chaijs.com/api/assert/)
* [karma](http://karma-runner.github.io/1.0/index.html) is used for running client side user tests in the browser
  * [Karma Mocha Reporter](https://www.npmjs.com/package/karma-mocha-reporter) used for generating mocha style command line output in Karma
* webpack offline
* editorconfig
* a basic style guide structure based on (atomic design)[http://bradfrost.com/blog/post/atomic-web-design/]
* a static deploy on (surge.sh)[http://surge.sh/]

**Enviroment setup for MacOS**

1. Install Nodejs:

[Nodejs](https://nodejs.org/en/)

2. Install all the dependencies:

```
npm i
```

3. Surge.sh

To use surge.sh you should copy and rename the script/deploy-test file running

```
cp scripts/deploy-test scripts/deploy
```

Then you need to create an account to deploy your static folder to perform this you should do:

```
node_modules/.bin/surge token
```

The only things left to do is update your surge tokens on the deploy file, the url to your project and modify the access permissons to the deploy script:

```
chmod +x scripts/deploy
```

## Developing
Javascript and scss style guide have been predetermined by reference Architecture in `.editorconfig`, `.jscsrc`, and `.jshintrc` those files are based on (Airbnb styles guide)[https://github.com/airbnb/javascript]. Git hooks are configured to run style checks on pre-commit and the test suite on pre-push. Anytime the hooks (or the dependencies for Node or Bower) are updated running `npm install` will ensure everything is up to date.

### Client-Side Javascript Patterns

TODO

## Npm scrips

* `npm run build` - Create a dist folder ready for production
* `grunt run build:dev` - Create a dist folder for dev enviroment
* `npm run deploy` - Send your dist code to surge.sh server
* `npm run dev` - Create a webpack server with development code
* `npm run lint` - Lint your js code
* `npm run imageOptim` - Optimize the image folder
* `npm run prod` - Create a webpack server with production code
* `npm run start` - run a local http server with your dist folder
* `npm run test` - Run Karma server return the unit test and coverage porcentage
* `npm run validate` - Run the lint build and test process
* `npm run watch:test` - Run test in watch mode
