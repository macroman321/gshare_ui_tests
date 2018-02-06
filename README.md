# README #

Acceptance tests for the [Clent Miner Application](https://gamecredits.atlassian.net/wiki/spaces/MIN/overview).

### Prerequisites ###
1. [Node.js](https://nodejs.org/) version 8.9.4 or newer with NPM version 5.6.0 or newer
    * Windows: install both using [NVM for Windows](https://github.com/coreybutler/nvm-windows)

### How to set up and run tests ###
1. Run: ```> npm install```
2. After the npm completes installation you can run the tests using cucumber:

Running tests on the Staging environment:

    > npm test path/to/<test_file>.feature --format pretty

### Who do I talk to about this framework ###

* Nenad Tanasković (nenad.tanaskovic@gamecredits.com)
* Dragan Nikolić (dragan.nikolic@gamecredits.com)

### References ###

* [Cucumber JS](https://github.com/cucumber/cucumber-js)
Cucumber for JavaScript.
* [Spectron](https://electronjs.org/spectron)
An Electron Testign Framework.