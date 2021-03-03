//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

import "./ERC20.sol";
import "./ERC20Detailed.sol";
import "./ERC20Mintable.sol";
import "./ERC20Burnable.sol";

contract CalcToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable {
  constructor(string memory name, string memory symbol, uint8 decimals) public ERC20Detailed(name, symbol, decimals) {}
}