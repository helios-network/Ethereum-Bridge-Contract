const hre = require("hardhat");
const fs = require("fs");

async function main() {

  const contract = await hre.ethers.getContractFactory("Hyperion");

  const covers = await contract.deploy();

  await covers.deployed();

  console.log(
    `Deployed to ${covers.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});