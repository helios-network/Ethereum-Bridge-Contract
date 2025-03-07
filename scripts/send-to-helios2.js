const hre = require("hardhat");
const { default: Web3 } = require("web3");

async function main() {
    const test = new Web3();

    const HyperionAddress = "0xEd825B3403cF72B3bd025Ab47D31BB1D496307F3";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    // const HYPERION_ID="0x0000000000000000000000000000000000000000000000000000000000000000" // hyperion id for Ethereum mainnet is number 0
    const HYPERION_ID="0x1000000000000000000000000000000000000000000000000000000000000000" // hyperion id for Polygon amoy is number 1
    const POWER_THRESHOLD=0
    const DEST_ADDRESS="0x961a14bEaBd590229B1c68A21d7068c8233C8542"
    const VALIDATOR_ADDRESSES=["0x17267eB1FEC301848d4B5140eDDCFC48945427Ab"]
    const VALIDATOR_POWERS=[10000]

   let encoded = test.utils.padLeft(DEST_ADDRESS, 64);

    const result = await hyperionContract.initialize(HYPERION_ID, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS);

    console.log(encoded);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});