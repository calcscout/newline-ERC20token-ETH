//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

import "./interfaces/libraries/Context.sol";
import "./interfaces/libraries/Roles.sol";

contract MinterRole is Context {
  using Roles for Roles.Role;

  event MinterAdded(address indexed account);
  event MinterRemoved(address indexed account);

  Roles.Role private _minters;


  function _addMinter(address account) internal {
    _minters.add(account);
    emit MinterAdded(account);
  }

  constructor() public {
    _addMinter(_msgSender());
  }

  function isMinter(address account) public view returns(bool) {
    return _minters.has(account);
  }

  modifier onlyMinter() {
    require(isMinter(_msgSender()), "MinterRole: caller doesn't have minter role");
    _;
  }


}
