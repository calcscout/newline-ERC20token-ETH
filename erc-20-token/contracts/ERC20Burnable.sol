//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

import "./ERC20.sol";
import "./interfaces/libraries/Context.sol";

contract ERC20Burnable is Context, ERC20 {

  function burn(uint256 amount) public {
    _burn(_msgSender(), amount);
  }

}
