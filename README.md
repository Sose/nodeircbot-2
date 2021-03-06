# Nobot

Simple IRC bot example. Fetches titles from URLs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node.js

### Installing

A step by step series of examples that tell you have to get a development env running

Download or clone the github repo

```
git clone https://github.com/Sose/nodeircbot-2.git
cd nodeircbot-2
```

Install required packages with npm or yarn.

```
npm install
OR
yarn install
```

Copy the default configuration file to `botconfig.json` and edit it

```
cp botconfig.default.json botconfig.json
```

Transpile with babel and start the bot

```
yarn build
yarn start
``` 

## Running the tests

The tests are written with Jest. Install development dependencies with npm or yarn.

Run the tests with

```
yarn test
```

## Built With

* [Flow](https://flow.org/) - Static type checker

## License

This project is licensed under the MIT License

## Acknowledgments

* Legacy of Nobot
