const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0xB8ed88AcD8b7ac80d9f546F4D75F33DD19dD5746";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const HYPERION_ID = 22
    const HYPERION_ID_BYTE32 = hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(HYPERION_ID), 32);// "0x0000000000000000000000000000000000000000000000000000000000000000"
    const POWER_THRESHOLD=1431655765 // 33%
    const VALIDATOR_ADDRESSES=["0x17267eB1FEC301848d4B5140eDDCFC48945427Ab"]
    const VALIDATOR_POWERS=[1431655766]

    const result = await hyperionContract.initialize(HYPERION_ID_BYTE32, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS);

    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});