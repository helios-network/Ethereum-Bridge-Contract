const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0x9cf46fff8618421a20e665312e2c88d38bb0b30f";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const ERC20_NAME="Ethereum"
    const ERC20_SYMBOL="ETH"
    const ERC20_DECIMALS=18
    const SUPPLY = hre.ethers.utils.parseEther("120000000")
    const result = await hyperionContract.deployERC20WithSupply("", ERC20_NAME, ERC20_SYMBOL, ERC20_DECIMALS, SUPPLY);

    console.log(result);

    console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});