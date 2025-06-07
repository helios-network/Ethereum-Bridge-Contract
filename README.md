# Ethereum Bridge Contract

## Required

- **Docker** : Install docker [Official Docker](https://www.docker.com/).
- **Node.js** : Node v18.16.0 Use nvm node version manager.

## Install

`npm install`

Also setup your secret key in `secret.js` file like this:

```js
module.exports = {
    MMENOMIC: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    API_KEY: "XXXXXXX"
};
```

## Build

`npm run compile`

## Deploy

don't forget to change the network in the script hardhat.config.js to the network you want to deploy to.

`npx hardhat run --network amoy scripts/deploy.js`

## Build wrappers for hyperion

`make gen`

## Export wrappers to hyperion folder

Required ../hyperion repository

`make exportwrappers`

## Audit

- **Audit File** : [Audit](https://github.com/helios-network/Ethereum-Bridge-Contract/blob/main/audit.pdf).

## Credit

Thanks for the works of Injective projet, this project is inspired by them.
