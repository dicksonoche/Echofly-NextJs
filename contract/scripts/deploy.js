const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const SocialNetwork = await ethers.getContractFactory("SocialNetwork");
  const socialNetwork = await SocialNetwork.deploy();

  console.log("SocialNetwork deployed to:", socialNetwork.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
