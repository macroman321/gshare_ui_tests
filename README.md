# README #

Acceptance tests for the [GShare Application](https://gamecredits.atlassian.net/wiki/spaces/MIN/overview).

### Prerequisites ###
1. [Node.js](https://nodejs.org/) version 8.9.4 or newer with NPM version 5.6.0 or newer
    
### How to set up and run tests ###
1. Run: ```npm install```
2. After npm completes the installation, you can run the tests with the following commands for example:

Run all tests on Linux on Staging environment:

    > ./run.sh linux gamecredits stage

Run a specific test on Windows on Production environment:

    > ./run.sh windows gamecredits prod features/log_in.feature

### Who do I talk to about this framework ###

* Dragan Nikolic (dragan.nikolic@gamecredits.com)
* Anyone from the GameSoftLab QA team

### References ###

* [Cucumber JS](https://github.com/cucumber/cucumber-js) - Cucumber for JavaScript
* [Spectron](https://electronjs.org/spectron) - An Electron Testing Framework
