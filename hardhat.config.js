/** @type import('hardhat/config').HardhatUserConfig */
var secret = require("./secret");
require("@nomiclabs/hardhat-ethers");
require('@nomiclabs/hardhat-etherscan');
require('hardhat-deploy');

module.exports = {
  etherscan: {
    apiKey: {
      bsc: secret.API_KEY,
      mainnet: secret.ETHER_SCAN_API_KEY
    }
  },
  networks: {
    bsc: {
        // truffle deploy --network avax
        url: `https://bsc-dataseed4.binance.org`,
        accounts: [secret.MMENOMIC],
        verify: {
          etherscan: {
            apiUrl: 'https://api.bscscan.com'
          }
        }
    },
    mainnet: {
      // truffle deploy --network avax
      url: `https://ethereum-rpc.publicnode.com`,
      accounts: [secret.MMENOMIC],
      verify: {
        etherscan: {
          apiUrl: 'https://etherscan.io'
        }
      }
  },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000000
      }
    }
  }
};