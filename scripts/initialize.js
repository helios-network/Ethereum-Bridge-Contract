const hre = require("hardhat");

async function main() {

    const HyperionAddress = "0xD01389f88f9ae0D1F9610E101265d84BD6fA73aF";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const HYPERION_ID = 42161
    const HYPERION_ID_BYTE32 = hre.ethers.utils.hexZeroPad(hre.ethers.utils.hexlify(HYPERION_ID), 32);// "0x0000000000000000000000000000000000000000000000000000000000000000"
    const POWER_THRESHOLD=1431655765 // 33%
    const VALIDATOR_ADDRESSES=["0x17267eB1FEC301848d4B5140eDDCFC48945427Ab"]
    const VALIDATOR_POWERS=[1431655766]

    const result = await hyperionContract.initialize(HYPERION_ID_BYTE32, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS, {
        gasLimit: 10000000,
        gasPrice: hre.ethers.utils.parseUnits("1", "gwei")
    });

    console.log(result);

    const receipt = await result.wait();
    console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});