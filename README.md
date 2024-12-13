# Building a fullstack dApp with The Graph (NextJs) - Echofly

## Overview

Echofly is a decentralized application (dApp) developed as a social media app for users to make posts, follow and interact with other users.

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Deploying the Smart Contract on local machine](#deploying-the-smart-contract-on-local-machine)
   - [Running the Frontend Application locally](#running-the-frontend-application-locally)
   - [Deploying the Smart Contract on the blockchain](#deploying-the-smart-contract-on-the-blockchain)

## Technologies Used

- **Solidity**: Smart contract language for Ethereum.
- **Hardhat**: Development environment for Ethereum.
- **IPFS**: For decentralized storage of uploaded files.
- **Next**: Library for managing the entire application.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Hardhat
- A Web3 wallet (e.g., MetaMask)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/chidubemokeke/Social-App_The-Graph_NextJS.git
   cd Social-App_The-Graph_NextJS
   ```

2. Install dependencies for contract and frontend:

```sh
   cd contract
npm install
cd ../my-dapp
npm install
```
### Deploying the Smart Contract on local machine
1. Navigate to `contract` directory to run the local node

   ```sh
   cd contract
   npx hardhat node
   ```

2. Copy the Private Key generated on the first account `Account #0`, and then import it into your MetaMask wallet app/browser extension.

3. While keeping the original terminal running at all times, open a different terminal deploy the smart contract on local machine(GO):

   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```

4. Copy the Contract Address generated on the terminal, then navigate to the `constants.js` file in the `my-dapp` folder:
Scroll to `CONTRACT_ADDRESS` and change it 
from `0x0E7E70...`
to the address generated.
   

5. Update the abi of your contract

   - Navigate to `/contract`
   - then `/artifacts`
   - then `/contracts` folder to copy the abi file (usually in .json)
   - Navigate to the `/context` folder in your `/my-dapp` directory
   - Delete the existing abi, and paste the copied abi
   - With every update contract code(in .sol), make sure to update your abi after deployment.

### Running the Frontend Application locally

1. For your IPFS, generate your `PINATA_API_KEY` and `PINATA_SECRET_KEY`
- Go to https://pinata.cloud
- Register or login into your account
- Navigate to `API Keys`
- Click on `Create New`
- Leave the default settings, then click on `Generate API Key.
- Copy your `API KEY` and `API SECRET`

2. Navigate to the `constants.js` file in the `my-dapp` directory.

3. Scroll to `PINATA KEYS` section of the code and then replace the `PINATA_API_KEY` and `PINATA_SECRET_KEY` with yours gotten from https://pinata.cloud

4. Scroll to `handleNetworkSwitch` and change the `networkName` 
from `optimism-sepolia` 
to `localhost`, to use your local machine's network 
or any other `network` of your choice, when using a testnet or mainnet.

5. Start the application `frontend` folder and start the React application:

   ```sh
   cd my-dapp
   npm run dev
   ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Approve the switch to your localhost network, then connect wallet.

Make sure to reload a minimum of two times after connecting wallet and entering name.

### Deploying the Smart Contract on the blockchain

1. Copy your smart contract code.
- Navigate to `/contract` then `/contracts` to copy the `contract` code.
- Head to https://remix.ethereum.org
- Create a new contract and paste your `contract` code.
- Click on the `Solidity Compiler` button and enable optimization to `999`
- Compile your code.
- Click on the `Deploy & run transactions`.
- Connect your ethereum address on the network you want to deploy to.
- Select your wallet address on `remix`'s deployment page(top left on page).
- Select contract you want to deploy, then click on `Deploy` button.
- Authorize the deployment transaction fees on MetaMask.

2. Copy the generated Contract Address on your `remix` console(bottom left).

3. Open your IDE, then navigate to the `constants.js` file in the `my-dapp` folder:
Scroll to `CONTRACT_ADDRESS` and change it 
from `0x...`
to the Contract Address generated.

4. Scroll to `handleNetworkSwitch` and change the `networkName` 
from `localhost` 
to `optimism_sepolia`, or any other `network` of your choice.

5. Restart the application `frontend` folder and start the React application:

   ```sh
   cd my-dapp
   npm run dev
   ```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Approve the switch to network, then connect wallet.

Make sure to reload a minimum of two times after connecting wallet and entering name.