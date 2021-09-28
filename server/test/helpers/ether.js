const Web3 = require("web3-utils");
const { BigNumber: BN } = require("bignumber.js");
// import Web3 from "web3";
// import {chaiBignumber as BN} from "chai-bignumber";

// convert values to wei
export function ether (n){
    return BN( Web3.toWei(n,'ether') );
}