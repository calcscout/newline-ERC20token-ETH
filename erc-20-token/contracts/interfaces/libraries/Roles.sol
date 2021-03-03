//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

library Roles {
  
  struct Role {
    mapping(address => bool) bearer;
  }

  function has(Role storage role, address account) internal view returns (bool) {
    require(account!=address(0), "Roles: account is the zero address");
    return role.bearer[account];
  }

  function add(Role storage role, address account) internal {
    require(!has(role, account), "Roles: account already has role");
    role.bearer[account] = true;
  }

  function remove(Role storage role, address account) internal {
    require(has(role, account), "Roles: account already has no role");
    role.bearer[account] = false;
  }
  
}