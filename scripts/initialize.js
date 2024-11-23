const hre = require("hardhat");

async function main() {

    const PeggyAddress = "0x9F15F76a0D7272901aB1C949c209B76d9B6b9392";
    const peggyContract = (await hre.ethers.getContractFactory("Peggy")).attach(PeggyAddress);

    const PEGGY_ID="0x696e6a6563746976652d70656767796964000000000000000000000000000000"
    const POWER_THRESHOLD=1431655765
    const VALIDATOR_ADDRESSES=["0x"]
    const VALIDATOR_POWERS=[2147483647]

    const result = await peggyContract.initialize(PEGGY_ID, POWER_THRESHOLD, VALIDATOR_ADDRESSES, VALIDATOR_POWERS);

    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});