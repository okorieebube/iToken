/*
Try to trigger an event
check acct token balance
transfer token from that acct to another
listen for an event emitted

*/

const {
  abi,
  ropsten_node,
  ganache_node,
  ACCT1,
  ACCT2,
  PRV_KEY_1,
} = require("./test-artifacts");
const lib = require("../src/lib/web3-libs");
const Web3 = require("web3");
const web3 = new Web3(ganache_node);
var Tx = require("ethereumjs-tx").Transaction;

let token_address = "0x8642053A9A90CB0Ec98d94687aC5Dc7BC62bfE62";
let contractABI = abi;
let iTokenContract = new web3.eth.Contract(contractABI, token_address);
iTokenContract.methods.balanceOf(ACCT1).call((err, acct_balance) => {
  console.log("result:", acct_balance, "err:", err);
});
