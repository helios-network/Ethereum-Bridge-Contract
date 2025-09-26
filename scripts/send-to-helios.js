const hre = require("hardhat");

async function main() {
  const HyperionAddress = "0x9cf46fff8618421a20e665312e2c88d38bb0b30f";
  const hyperionContract = (
    await hre.ethers.getContractFactory("Hyperion")
  ).attach(HyperionAddress);

  const HELIOS_DEST_ADDRESS = "0x882f8A95409C127f0dE7BA83b4Dfa0096C3D8D79"; // the ethAddress format of helios1q7za4flwjq3kel3aau05tkm4l4v2mtx8r6aerj
  const TOKEN_CONTRACT = "0x682074Fe09F711eCAb997CfD5C20Db1fF7d0fc34";
  const TOKEN_AMOUNT = hre.ethers.utils.parseEther("10");
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

  const approveTx = await tokenContract
    .connect(signer)
    .approve(HyperionAddress, TOKEN_AMOUNT);
  await approveTx.wait();
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
