//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.5.16;

import "./interfaces/IERC20.sol";
import "./interfaces/libraries/SafeMath.sol";
import "./interfaces/libraries/Context.sol";

contract ERC20 is Context, IERC20 {
  using SafeMath for uint256;

  mapping(address => uint256) private _balances;
  mapping(address => mapping(address => uint256)) private _allowances;

  uint256 private _totalSupply;

  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) public view returns (uint256){
    return _balances[account];
  }

function _transfer(address sender, address recipient, uint256 amount) internal {
  require(sender != address(0), "ERC20: transfer from the zero address");
  require(recipient != address(0), "ERC20: transfer to the zero address");

  _balances[sender] = _balances[sender].sub(amount);
  _balances[recipient] = _balances[recipient].add(amount);
  emit Transfer(sender, recipient, amount);
}

function transfer(address recipient, uint256 amount) public returns(bool) {
  _transfer(_msgSender(), recipient, amount);
  return true;
}

function allowance(address owner, address spender) public view returns (uint256) {
  return _allowances[owner][spender];
}

function _approve(address owner, address spender, uint256 amount) internal {
  require(owner != address(0), "ERC20: approve from zero address");
  require(spender != address(0), "ERC20: approve to zero address");
  _allowances[owner][spender] = amount;
  emit Approval(owner, spender, amount);
}

function approve(address spender, uint256 amount) public returns(bool) {
  _approve(_msgSender(), spender, amount);
  return true;
}

function transferFrom(address sender, address recipient, uint256 amount) public returns(bool) {
  _transfer(sender, recipient, amount);
  _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount));
  return true;
}

function _mint(address account, uint256 amount) public {
  require(account != address(0), "ERC20: mint to the zero address");
  _totalSupply = _totalSupply.add(amount);
  _balances[account] = _balances[account].add(amount);
  emit Transfer(address(0), account, amount);
}

function _burn(address account, uint256 amount) internal {
  require(account != address(0), "ERC20: burn from the zero address");

  _balances[account] = _balances[account].sub(amount);
  _totalSupply = _totalSupply.sub(amount);
  emit Transfer(account, address(0), amount);
}

}