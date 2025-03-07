const { MAX_UINT256 } = require("@openzeppelin/test-helpers/src/constants");
const hre = require("hardhat");

async function main() {
  const HyperionAddress = "0xEd825B3403cF72B3bd025Ab47D31BB1D496307F3";
  const hyperionContract = (
    await hre.ethers.getContractFactory("Hyperion")
  ).attach(HyperionAddress);

  const HELIOS_DEST_ADDRESS = "0x0785daa7ee90236cfe3DEf1F45dB75Fd58aDacC7"; // the ethAddress format of helios1q7za4flwjq3kel3aau05tkm4l4v2mtx8r6aerj
  const TOKEN_CONTRACT = "0x5682dc0089929eef5efc8927e17e137b4ec96403"; // USDC on Polygon Amoy
  const TOKEN_AMOUNT = "112233000000000000000"; // 0.1 USDC
  const DATA = "";

  const destinationBytes32 = hre.ethers.utils.hexZeroPad(
    HELIOS_DEST_ADDRESS,
    32
  );
  console.log(destinationBytes32);

  // Step 1: Approve USDC transfer for Hyperion Contract
  const tokenContract = await hre.ethers.getContractAt(
    "IERC20",
    TOKEN_CONTRACT
  );
  const signer = await hre.ethers.getSigner();

//   const approveTx = await tokenContract
//     .connect(signer)
//     .approve(HyperionAddress, TOKEN_AMOUNT + '000000');
//   await approveTx.wait();
  console.log("Approved USDC for Hyperion contract");

  const sendTx = await hyperionContract.sendToHelios(
    TOKEN_CONTRACT,
    destinationBytes32,
    TOKEN_AMOUNT,
    DATA
  );

  console.log(sendTx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
