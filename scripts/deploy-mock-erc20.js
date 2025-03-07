const hre = require("hardhat");

async function main() {

    const COSMOS_DENOM="uet"
    const ERC20_NAME="UET"
    const ERC20_SYMBOL="UET"
    const ERC20_DECIMALS=18

    const contract = await hre.ethers.getContractFactory("TestERC20");
    const result = await contract.deploy();


    console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});