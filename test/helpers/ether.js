import Web3 from "web3";
import {chaiBignumber as BN} from "chai-bignumber";

export default function ether (n){
    return BN( Web3.toWei(n,'ether') );
}