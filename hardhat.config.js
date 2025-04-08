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
    amoy: {
      // truffle deploy --network avax
      url: `https://rpc-amoy.polygon.technology`,
      accounts: [secret.MMENOMIC],
      verify: {
        etherscan: {
          apiUrl: 'https://amoy.polygonscan.com'
        }
      }
  },
    sepolia: {
      // truffle deploy --network avax
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [secret.MMENOMIC],
      verify: {
        etherscan: {
          apiUrl: 'https://sepolia.etherscan.io'
        }
      }
  },
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