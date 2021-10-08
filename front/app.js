var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:9545");
require('dotenv').config();

const account1 = "0x30B610e04aeEf4e6621eB9AFc72933B9c91e967f"; // Your account address 1
const account2 = "0xFE34ce61f704D7DA995F43E28b8B8c256DD4C3a5"; // Your account address 2

const privateKey1 = Buffer.from(process.env.PRV_KEY_1, "hex"); // convert our pv key to binary data
const privateKey2 = Buffer.from(process.env.PRV_KEY_2, "hex");

// web3.eth.getBalance(account1, (err, result) => {
//   console.log(` acct balance: ${web3.utils.fromWei(result, "ether")} `);
// });

(async () => {
  let txnObject = await build_txn_obj(account1, account2, "1000000", "10");
  console.log(txnObject);

  // Sign the transaction
  const tx = new Tx(txnObject);
  tx.sign(privateKey1);

  // Convert to RLP encoding
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
    console.log("err:", err);
    // Now go check etherscan to see the transaction!
  });

})();







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
    data:process.env.BYTE_CODE,
    nonce: web3.utils.toHex(txnCount),
    to: to,
    // value: web3.utils.toHex(web3.utils.toWei(amt_in_eth, "ether")),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei(gas_price, "gwei")),
  };
  return txnObject;
}
