const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0xb0A773bd9f57D9eBD25d627eC3F36074A21863b2";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const result = await hyperionContract.state_lastValsetNonce();

    console.log(result.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});