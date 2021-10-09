const { abi } = require("./test-artifacts");
var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
// const web3 = new Web3("http://127.0.0.1:9545");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/d63909e0536444598bbb296ac1db03dd"
);
require('dotenv').config();

let account1 = process.env.acct_1;
const account2 = "0xFE34ce61f704D7DA995F43E28b8B8c256DD4C3a5"; // Your account address 2

const privateKey1 = Buffer.from(process.env.PRV_KEY_1, "hex"); // convert our pv key to binary data
// const privateKey2 = Buffer.from(process.env.PRV_KEY_2, "hex");

// web3.eth.getBalance(account1, (err, result) => {
//   console.log(` acct balance: ${web3.utils.fromWei(result, "ether")} `);
// });

(async () => {
  
  // send a basic signed txn with ether 
  // let txnObject = await build_txn_obj(account1, account2, "1000000", "10");


  const encodedParameters = await web3.eth.abi.encodeParameters(
    [ 'string', 'string', 'uint8'],
    ['iToken', 'ITK', 18]
  ).slice(3);
  const bytecodeWithEncodedParameters = process.env.BYTE_CODE + encodedParameters;

  
  let txnObject = await deploy_contract_object(account1,bytecodeWithEncodedParameters);

  // Sign the transaction
  const tx = new Tx(txnObject,{chain:'ropsten'});
  tx.sign(privateKey1);

  // Convert to RLP encoding
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err:", err, "txHash:", txHash);
  });

})();


// let contract_address = "0xFD30d6f3CCA2a85f37665ff2A38a82B3EAf42e4c";
// let contractABI = abi;
// let iTokenContract = new web3.eth.Contract(contractABI, contract_address);
// console.log(iTokenContract)
// iTokenContract.methods.totalSupply().call((err, result) => { console.log("result:", result, "err:", err) })






/**
 *
 * @param {address} from account sending from
 * @param {address} to account sending to
 * @param {number} amt_in_eth amount in ether
 * @param {number} gas_price amount of gas in gwei
 * @returns object
 */
async function build_txn_obj(from, to, amt_in_eth, gas_price) {
  let txnCount = await web3.eth.getTransactionCount(from);
  let txnObject = {
    data: process.env.BYTE_CODE,
    nonce: web3.utils.toHex(txnCount),
    to: to,
    // value: web3.utils.toHex(web3.utils.toWei(amt_in_eth, "ether")),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei(gas_price, "gwei")),
  };
  return txnObject;
}

async function deploy_contract_object(from, bytecodeWithEncodedParameters) {
  let txCount = await web3.eth.getTransactionCount(from);
  const txObject = {
    gasPrice: web3.eth.getGasPrice(),
    gasLimit: web3.eth.estimateGas({ bytecodeWithEncodedParameters }),
    // data: process.env.BYTE_CODE,
    data: bytecodeWithEncodedParameters,
    nonce: web3.utils.toHex(txCount),
    from: account1,
    // gasLimit: web3.utils.toHex("2000000"),
    // gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };
  return txObject;
}
