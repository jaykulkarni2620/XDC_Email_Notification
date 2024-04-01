// hardhat.config.js
require('dotenv').config();
// require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    apothem: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      apothem: "abc",
      devnet: "abc",
      xdc: "abc",
    },
    customChains: [
      {
        network: "apothem",
        chainId: 51,
        urls: {
          apiURL: "https://abapi.blocksscan.io/api",
          browserURL: "https://apothembeta.blocksscan.io/",
        },
      },
      {
        network: "devnet",
        chainId: 551,
        urls: {
          apiURL: "https://devnetapi.blocksscan.io/api",
          browserURL: "https://devnet.blocksscan.io/",
        },
      },
      {
        network: "xdc",
        chainId: 50,
        urls: {
          apiURL: "https://bapi.blocksscan.io/api",
          browserURL: "https://beta.blocksscan.io/",
        },
      },
    ],
  },
};
