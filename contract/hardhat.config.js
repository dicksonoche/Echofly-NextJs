require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    "optimism-sepolia": {
      url: "https://sepolia.optimism.io",
      chainId: 11155420,
      accounts: [
        "634e09c8e44458a98ff5aeee556fcfdbffe7918e8d8121991ca970ec68f34b93",
      ],
    },
    "base-mainnet": {
      url: "https://mainnet.base.org/",
      chainId: 8453,
      accounts: [
        "634e09c8e44458a98ff5aeee556fcfdbffe7918e8d8121991ca970ec68f34b93",
      ],
    },
    sepolia: {
      url:
        process.env.INFURA_PROJECT_URL ||
        "https://sepolia.infura.io/v3/45659e58bfd842309ac5e26ecd083106",
      accounts: [
        process.env.PRIVATE_KEY ||
          "d17533e7ae67bfc4331bdba4de18dc48ca9568333d3d6566fcc793af7fec2682",
      ],
    },
  },
  etherscan: {
    apiKey:
      process.env.ETHERSCAN_API_KEY ||
      "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Add your Etherscan API key here
  },
};
