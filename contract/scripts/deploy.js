const {ethers} = require('hardhat')
async function main() {
  const [deployer] = await ethers.getSigners(); // Get the deployer's wallet address
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory for the SocialNetwork
  const sn = await ethers.getContractFactory("SocialNetwork");
  // Deploy the contract
  const sN = await sn.deploy();
  await sN.deployed(); // Wait for the deployment to complete

  console.log("SocialNetwork contract deployed to:", sN.address); // Log the contract address
}

// Run the main function and handle any errors
main()
  .then(() => process.exit(0)) // Exit the process if successful
  .catch((error) => {
    console.error(error); // Log any errors
    process.exit(1); // Exit the process with an error code
  });
