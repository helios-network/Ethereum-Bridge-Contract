const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0xba6CC5548f6203686172a60C9bE6972b135a22f9";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const result = await hyperionContract.state_lastValsetCheckpoint();

    console.log(result.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});