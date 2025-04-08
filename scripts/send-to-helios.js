const hre = require("hardhat");

async function main() {
  const HyperionAddress = "0xB8ed88AcD8b7ac80d9f546F4D75F33DD19dD5746";
  const hyperionContract = (
    await hre.ethers.getContractFactory("Hyperion")
  ).attach(HyperionAddress);

  const HELIOS_DEST_ADDRESS = "0x17267eB1FEC301848d4B5140eDDCFC48945427Ab"; // the ethAddress format of helios1q7za4flwjq3kel3aau05tkm4l4v2mtx8r6aerj
  const TOKEN_CONTRACT = "0x389a1010dFDf758Ab98cd75793EE80d784517ae4";
  const TOKEN_AMOUNT = hre.ethers.utils.parseEther("500");
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
