const hre = require("hardhat");
const { default: Web3 } = require("web3");

async function main() {
    const test = new Web3();

    const HyperionAddress = "0x75B83dDeb27dbEF2702bdC462B4F1fEFF0dB0E68";
    const peggyContract = (await hre.ethers.getContractFactory("Hyperion")).attach(HyperionAddress);

    const PEGGY_ID="0x696e6a6563746976652d70656767796964000000000000000000000000000000"
    const POWER_THRESHOLD=1431655765
    const DEST_ADDRESS="0x961a14bEaBd590229B1c68A21d7068c8233C8542"
    const VALIDATOR_POWERS=[2147483647]

   let encoded = test.utils.padLeft(DEST_ADDRESS, 64);

    const result = await peggyContract.initialize(PEGGY_ID, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS);

    console.log(encoded);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});