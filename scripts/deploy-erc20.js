const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0x87180495C8393C810fBD0882265B4C3b1EF2431e";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const ERC20_NAME="Helios"
    const ERC20_SYMBOL="HLS"
    const ERC20_DECIMALS=18
    const SUPPLY = hre.ethers.utils.parseEther("100000")

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