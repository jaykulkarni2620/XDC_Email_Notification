// contracts/XDCVault.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract XDCVault {
    address public owner;
    
    struct Transfer {
        address sender;
        uint amount;
        string unlockCodeHash;
        bool isClaimed;
    }

    mapping(string => Transfer) public transfers;

    constructor() {
        owner = msg.sender;
    }

    function initiateTransfer(string memory _emailHash, uint _amount, string memory _unlockCodeHash) public {
        require(msg.sender.balance >= _amount, "Insufficient balance");
        // Lock the XDC in the contract
        transfers[_emailHash] = Transfer(msg.sender, _amount, _unlockCodeHash, false);
    }

    function claimXDC(string memory _emailHash, string memory _unlockCode) public {
        require(keccak256(abi.encodePacked(_unlockCode)) == keccak256(abi.encodePacked(transfers[_emailHash].unlockCodeHash)), "Invalid unlock code");
        require(!transfers[_emailHash].isClaimed, "Already claimed");
        
        // Transfer XDC to the recipient
        payable(msg.sender).transfer(transfers[_emailHash].amount);
        transfers[_emailHash].isClaimed = true;
    }
}
