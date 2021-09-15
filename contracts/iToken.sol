// contracts/iToken.sol
// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.25 ;
pragma solidity <=0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract iToken is ERC20 {

    // Decimal for ERC20 tokens is 18 by default.
    constructor(string memory name_, string memory symbol_)  ERC20  (name_, symbol_) {

    }
}
