// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

contract HyperionPrecompile {

    function setOrchestratorAddresses(
        address orchestratorAddress,
        uint64 hyperionId
    ) pure external returns (bool success) {

        // todo simulate the logic of the function

        orchestratorAddress = address(0x394D34Eb86b1837E9265c92930BF4633C5D51B05);
        hyperionId = 1;

        return true;
    }

    function depositClaim(
        uint64 hyperionId,
        uint64 eventNonce,
        uint64 blockHeight,
        string memory tokenContract,
        uint256 amount,
        string memory ethereumSender,
        string memory cosmosReceiver,
        string memory orchestrator,
        string memory data,
        string memory txHash
    ) pure external returns (bool success) {
        // todo simulate use of each of the arguments

        hyperionId = 1;
        eventNonce = 1;
        blockHeight = 1;
        tokenContract = "0x123";
        amount = 100;
        ethereumSender = "0x123";
        cosmosReceiver = "0x123";
        orchestrator = "0x123";
        data = "0x123";
        txHash = "0x123";

        return true;
    }

}