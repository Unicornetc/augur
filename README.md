Augur Client
------------

This is the frontend for [Augur](http://augur.net), a decentralized prediction market platform that runs on Ethereum.

## How Dapps Work

Ethereum Dapps store their data on the Ethereum blockchain, and their frontends are web pages that use the JavaScript API to access blockchain data.

* [Ethereum Frontier Guide](http://ethereum.gitbooks.io/frontier-guide/content/)
* [Ethereum Development Tutorial](https://github.com/ethereum/wiki/wiki/Ethereum-Development-Tutorial)
* [Ethereum JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)
* [Ethereum Wiki](https://github.com/ethereum/wiki/wiki)
* [Ethereum Builders](http://ethereum.builders/) ([YouTube Channel](https://www.youtube.com/channel/UCYlXQeVJ__t7T5kgHWhhiXQ))
* [State of the Dapps](https://docs.google.com/spreadsheets/d/1VdRMFENPzjL2V-vZhcc_aa5-ysf243t5vXlxC2b054g/edit#gid=0), a spreadsheet of Dapps in development

## Getting Started

### Running Ethereum

Install go-ethereum ([installation instructions](https://github.com/ethereum/go-ethereum/wiki)). Add a new account with `geth account new` and then start the client with `geth --rpc --rpccorsdomain 'http://localhost:8080' --networkid 1010101 --protocolversion 59 --datadir directory_of_your_choice --shh --unlock primary --bootnodes "enode://035b7845dfa0c0980112abdfdf4dc11087f56b77e10d2831f186ca12bc00f5b9327c427d03d9cd8106db01488905fb2200b5706f9e41c5d75885057691d9997c@[::]:30303" console`.

For more info checkout: http://www.augur.net/blog/the-augur-alpha-is-now-available-to-download

### Local or Docker

You can launch augur-client locally with the instructions in the following sections, or run it in [docker](https://docs.docker.com/) with one of:
```
# get a quick start with a pre-built image:
docker run -p 8080:8080 carver/augur-client

# or rebuild your own image with:
git clone https://github.com/AugurProject/augur-client.git
cd augur-client
docker build -t augur-client .
docker run -p 8080:8080 augur-client
```

### Building augur-client

Install [Node.js](https://nodejs.org/), then:

```
git clone https://github.com/AugurProject/augur-client.git
cd augur-client
git checkout develop
npm install -g grunt-cli
npm install
grunt browserify:build
```

### Running augur-client

`npm start`

[http://localhost:8080](http://localhost:8080)

### For development

use `grunt watchify` to have grunt watch for changes.  `grunt browserify:debug` for helpful (yet slow) module mappings in console.

*NOTE:*  a seperate dev branch is used when building in this manner and data will be seperate from the default build above.

## Contributing

We think Augur and Ethereum are pretty fascinating, and they're going to change the world. You should be a part of this.

We use [ZenHub](https://zenhub.io) to organize our GitHub issues. Find an issue in the To Do column that looks good, comment on it to let us know you want to tackle it, and we'll help you get it done.

Most discussions happen in our Slack, which has an IRC gateway in #augur on Freenode. You can ask for a Slack invite there, or stick with IRC if you prefer.
