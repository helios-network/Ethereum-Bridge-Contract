const hre = require("hardhat");
const { default: Web3 } = require("web3");

async function main() {
    const test = new Web3();

    const HyperionAddress = "0x75B83dDeb27dbEF2702bdC462B4F1fEFF0dB0E68";
    const hyperionContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    // const HYPERION_ID="0x0000000000000000000000000000000000000000000000000000000000000000" // hyperion id for Ethereum mainnet is number 0
    const HYPERION_ID="0x1000000000000000000000000000000000000000000000000000000000000000" // hyperion id for Polygon amoy is number 1
    const POWER_THRESHOLD=1431655765
    const DEST_ADDRESS="0x961a14bEaBd590229B1c68A21d7068c8233C8542"
    const VALIDATOR_ADDRESSES=["0x688feDf2cc9957eeD5A56905b1A0D74a3bAc0000"]
    const VALIDATOR_POWERS=[2147483647]

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