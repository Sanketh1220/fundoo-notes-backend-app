# Fundoo Notes API

## description
This is a fundoo notes app project made with nodejs, express and mongodb

---

## Requirements
For development, you will need only Node.js ,node global package and mongodb installed in your environment

### Node
- #### Node installation on Mac OS

    You can install Nodejs directly from [official Node.js website](https://nodejs.org/en/download/).

    You can install npm directly from terminal, just run this command

        $ npm install npm@latest -g 

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.0 (Or whatever is newer version you installed)

    $ npm --version
    7.15.0  (Or whatever is newer version you installed)

## Configure app

Create (.env) file and insert 

    URL="(Your mongoDB URL)"

    PORT=3000

    SECRET_TOKEN="(Any secret code so as to authorize the user)"

## npm start
Runs the app
Open http://localhost:3000 to view it in the browser.

## npm test
Runs to execute the unit test cases via [Mocha](https://mochajs.org/).
