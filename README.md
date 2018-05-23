# README #

Acceptance tests for the [GShare Application](https://gamecredits.atlassian.net/wiki/spaces/MIN/overview).

### Prerequisites ###
1. [Node.js](https://nodejs.org/) version 8.9.4 or newer with NPM version 5.6.0 or newer
    * Windows: install both using [NVM for Windows](https://github.com/coreybutler/nvm-windows)

### How to set up and run tests ###
1. Run: ```> npm install```
2. After the npm completes installation you can run the tests using cucumber:

Running all tests using Linux Gamecredits variant on the Staging environment:

    ```> ./run.sh linux gamecredits stage```

Running login tests using Windows Gamecredits variant on the Production environment:

    ```> ./run.sh windows gamecredits prod features/log_in.feature```

### Who do I talk to about this framework ###

* Dragan Nikolic (dragan.nikolic@gamecredits.com)
* Anybody else from the GameCredits QA team

### References ###

* [Cucumber JS](https://github.com/cucumber/cucumber-js)
Cucumber for JavaScript.
* [Spectron](https://electronjs.org/spectron)
An Electron Testign Framework.