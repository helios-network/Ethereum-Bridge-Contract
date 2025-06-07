const hre = require("hardhat");

async function main() {

    const tokenAddress = "0x507ABEA5D8d39E1880E0fd7620fe433B5797A284";
    const tokenContract = (await hre.ethers.getContractFactory("CosmosERC20")).attach(tokenAddress);

    const owner = await tokenContract.owner();

    console.log(owner);

    // const result = await tokenContract.transferOwnership("0xD8B97AF5cf87ddc57998069F5320e7BF70AF7626");

    // console.log(result);

    // console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});