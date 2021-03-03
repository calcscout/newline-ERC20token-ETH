//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

import "./interfaces/IERC20.sol";

contract ERC20Detailed is IERC20 {
  //variables
  string private _name;
  string private _symbol;
  uint8 private _decimals;

  constructor(string memory name, string memory symbol, uint8 decimals) public {
    _name = name;
    _symbol = symbol;
    _decimals = decimals;
  }

  //Methods to read details of this token
  function name() public view returns (string memory) {
    return _name;
  }
  function symbol() public view returns (string memory) {
    return _symbol;
  }
  function decimals() public view returns (uint8) {
    return _decimals;
  }
}
