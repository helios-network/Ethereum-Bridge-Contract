const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0x007660aaE00Bd5DBeA00A003A6c92cE6Da134c02";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const ERC20_NAME="CheckDot"
    const ERC20_SYMBOL="CDT"
    const ERC20_DECIMALS=18
    const SUPPLY = hre.ethers.utils.parseEther("10000")

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