// contracts/iToken.sol
// SPDX-License-Identifier: MIT
// pragma solidity 0.8.7;
pragma solidity 0.5.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract iToken is ERC20, ERC20Detailed {
    // Decimal for ERC20 tokens is 18 by default.
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public ERC20Detailed(name, symbol, 18) {
        // _mint(_msgSender(), initialSupply);
    }
}
