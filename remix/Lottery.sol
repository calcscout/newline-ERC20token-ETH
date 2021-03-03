//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.5.16;

contract Lottery {
    address public manager; //manager responsible for the contract
    address payable[] public players; //array of addresses which can accept ether
    
    constructor() public {
        manager = msg.sender;
    }
    
    //function which will be used for persons to enter the Lottery
    function enter() public payable {
       require(msg.value > 0.1 ether, "Please send more than 0.1 ether to the contract");
    
        //adding the player to array of participants of the lottery
        players.push(msg.sender);  
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
       uint index = random() % players.length;
       players[index].transfer(address(this).balance);
       players = new address payable[](0);
    }
    
    // function getPlayers() public view returns (asddress payable[] memory){
    //     return players;
    // }
    
    modifier restricted() {
        require(msg.sender == manager, "Only manager of this lottery can call this function");
        _;
    }
 
}