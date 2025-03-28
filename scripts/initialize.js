const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0x007660aaE00Bd5DBeA00A003A6c92cE6Da134c02";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const HYPERION_ID = 21
    const HYPERION_ID_BYTE32 = hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(HYPERION_ID), 32);// "0x0000000000000000000000000000000000000000000000000000000000000000"
    const POWER_THRESHOLD=1431655765
    const VALIDATOR_ADDRESSES=["0x17267eB1FEC301848d4B5140eDDCFC48945427Ab"]
    const VALIDATOR_POWERS=[2147483647]

    const result = await hyperionContract.initialize(HYPERION_ID_BYTE32, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS);

    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});