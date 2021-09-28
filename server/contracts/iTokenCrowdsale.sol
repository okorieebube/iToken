// SPDX-License-Identifier: MIT
pragma solidity 0.5.5;
import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract iTokenCrowdSale is Crowdsale, MintedCrowdsale {
    constructor(
        uint256 rate,
        address payable wallet,    // Address where users send funds to
        IERC20 token  // address of token to be sold
    ) public MintedCrowdsale() Crowdsale(rate, wallet, token) {
        
    }
}
