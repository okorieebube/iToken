// SPDX-License-Identifier: MIT
// pragma solidity 0.8.7;
pragma solidity 0.5.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract iToken is ERC20, ERC20Detailed, ERC20Mintable {
    // Decimal for ERC20 tokens is 18 by default.
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) public ERC20Detailed(_name, _symbol, _decimals) {
    }
}
