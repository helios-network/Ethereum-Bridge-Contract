const hre = require("hardhat");

async function main() {

    const PeggyAddress = "0x9F15F76a0D7272901aB1C949c209B76d9B6b9392";
    const peggyContract = (await hre.ethers.getContractFactory("Peggy")).attach(PeggyAddress);

    const COSMOS_DENOM="helios"
    const ERC20_NAME="HELIOS"
    const ERC20_SYMBOL="HELIOS"
    const ERC20_DECIMALS=18

    const result = await peggyContract.deployERC20(COSMOS_DENOM, ERC20_NAME, ERC20_SYMBOL, ERC20_DECIMALS);

    console.log(result);

    console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});