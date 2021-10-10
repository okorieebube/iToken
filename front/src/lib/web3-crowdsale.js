/* 
deploy crowdsale contract
buy and mint token
 */
const {
  ropsten_node,
  ganache_node,
  ACCT1,
  ACCT2,
  PRV_KEY_1,
} = require("../../test-artifacts");
const lib = require("./web3-libs");
const Web3 = require("web3");
const web3 = new Web3(ganache_node);
var Tx = require("ethereumjs-tx").Transaction;
require("dotenv").config();

const PRV_KEY1 = Buffer.from(PRV_KEY_1, "hex");




(async () => {
  // GET TRUFFLE COMPILED CROWDSALE DETAILS
  const CROWDSALE_ARTIFACT = await lib.contract_artifact("iTokenCrowdsale");
  const CROWDSALE_BYTECODE = CROWDSALE_ARTIFACT.bytecode;

  // rate, wallet, token
  const encodedParameters = await web3.eth.abi
    .encodeParameters(["uint256", "address", "address"], [500, ACCT2, "18"])
    .slice(2);

  const bytecodeWithEncodedParameters = CROWDSALE_BYTECODE + encodedParameters;

  let txnObject = await lib.deploy_contract_object(
    ACCT1,
    bytecodeWithEncodedParameters
  );
  // console.log(txnObject)

  // Sign the transaction
  const tx = new Tx(
    txnObject
    // ,{chain:'ropsten'}
  );
  tx.sign(PRV_KEY_1);

  // Convert to RLP encoding
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err:", err, "txHash:", txHash);
  });
  // console.log(CROWDSALE_BYTECODE);
  return;
})();
