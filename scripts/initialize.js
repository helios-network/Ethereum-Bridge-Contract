const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0x187547175959a1A59142f5D1B39fb39630DA8C8B";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const HYPERION_ID="0x1000000000000000000000000000000000000000000000000000000000000000"
    const POWER_THRESHOLD=1431655765
    const VALIDATOR_ADDRESSES=["0x17267eB1FEC301848d4B5140eDDCFC48945427Ab"]
    const VALIDATOR_POWERS=[2147483647]

    const result = await hyperionContract.initialize(HYPERION_ID, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS);

    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});