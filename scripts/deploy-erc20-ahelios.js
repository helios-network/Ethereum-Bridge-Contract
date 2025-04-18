const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0xA2512e1f33020d34915124218EdbEC20901755b2";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const HELIOS_ERC20_DENOM="ahelios"
    const ERC20_NAME="Helios"
    const ERC20_SYMBOL="HLS"
    const ERC20_DECIMALS=18

    const result = await hyperionContract.deployERC20(HELIOS_ERC20_DENOM, ERC20_NAME, ERC20_SYMBOL, ERC20_DECIMALS);

    console.log(result);

    console.log(await result.wait());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});