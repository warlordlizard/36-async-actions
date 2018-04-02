![cf](https://i.imgur.com/7v5ASc8.png) Lab 35: Async Actions
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **.babelrc** - contains babel config
* **package.json** - contains npm package config
* **webpack.config.js** - contains webpack config
* **src/** - contains the frontend code
* **src/components/** - contains your components
* **src/main.js** - contains the entire app
* **src/style** - containing your `.scss` partials and styles
* **src/style/main.scss** - contains the entry point for `.scss` partials

## Feature Tasks
##### Minimum Requirements

### Clone a Backend
Clone, configure, and run your **lab-14-two-resource-api**.

### Create a Frontend Application
Create a frontend, for your **lab-14-two-resource-api**.  Your frontend should meet the following criteria:
* Use react/redux best practices
* Add validation in your redux routers
* Add reporter and thunk middleware to your redux store
* Create asynchronous action creators for making AJAX requests to your backend
* Create synchronous action creators from updating your application store
* Note: You may remove authentication from any routes that require it - we will be covering "sign up" and "sign in" functionality tomorrow

### Stretch Goal
* Attempt to test your action creators.  We haven't covered testing yet, so you'll need to reference the `jest` documentation in order to properly configure **webpack** and your `package.json` file.  As an initial starting point, you'll want to test that your action creators return an action object with the correct properties/data.  Don't worry if you're unable to get your tests to pass or `jest` to run, we'll be discussing the testing of actions, action creators, and reducers tomorrow.