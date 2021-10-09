const { abi, ropsten_node, ganache_node } = require("./test-artifacts");
var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3(ganache_node);
const lib = require("./src/lib/web3-libs")
// import deploy_contract_object from './src/lib/web3-libs'
require('dotenv').config();

let account1 = process.env.acct_1;
const account2 = process.env.acct_2; 

const privateKey1 = Buffer.from(process.env.PRV_KEY_1, "hex"); // convert our pv key to binary data
// const privateKey2 = Buffer.from(process.env.PRV_KEY_2, "hex");




/* (async () => {
  
  // send a basic signed txn with ether 
  // let txnObject = await build_txn_obj(account1, account2, "1000000", "10");


  const encodedParameters = await web3.eth.abi.encodeParameters(
    [ 'string', 'string', 'uint8'],
    ['iToken', 'ITK', '18']
  ).slice(2);

  const bytecodeWithEncodedParameters = process.env.BYTE_CODE + encodedParameters;

  
  let txnObject = await deploy_contract_object(account1,bytecodeWithEncodedParameters);
  // console.log(txnObject)

  // Sign the transaction
  const tx = new Tx(txnObject
    // ,{chain:'ropsten'}
    );
  tx.sign(privateKey1);

  // Convert to RLP encoding
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err:", err, "txHash:", txHash);
  });

})();
 */



let contract_address = "0x7Afec8f88a1804893AbB2F5b9daeFe3F2cdC8994";
let contractABI = abi;
let iTokenContract = new web3.eth.Contract(contractABI, contract_address);
// console.log(iTokenContract)
iTokenContract.methods.balanceOf(account1).call((err, result) => { console.log("result:", result, "err:", err) })

// lib.transfer(iTokenContract,account1, account2, '1', contract_address)







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
    // gasPrice: await web3.utils.toHex(web3.eth.getGasPrice()),
    // gasLimit: await web3.utils.toHex(web3.eth.estimateGas({ bytecodeWithEncodedParameters })),
    data: bytecodeWithEncodedParameters,
    nonce:  web3.utils.toHex(txCount),
    from: account1,
    gasLimit: web3.utils.toHex("2000000"),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };
  return txObject;
}
