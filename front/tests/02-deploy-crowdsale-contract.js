/* 
deploy crowdsale contract
buy and mint token
 */
// const { ether } =  require('../../server/test/helpers/ether');
const {
  TOKEN_ABI,
  ropsten_node,
  ganache_node,
  ACCT1,
  ACCT2,
  PRV_KEY_1,
  ACCT3,
  PRV_KEY_3,
  CROWDSALE_BYTECODE,
  TOKEN_ADDRESS,
} = require("./test-artifacts");
const lib = require("../src/lib/web3-libs");
const Web3 = require("web3");
const web3 = new Web3(ganache_node);
const web3Utils = require("web3-utils");
var Tx = require("ethereumjs-tx").Transaction;

const PRV_KEY1 = Buffer.from(PRV_KEY_1, "hex");
const PRV_KEY3 = Buffer.from(PRV_KEY_3, "hex");

(async () => {
  // GET TRUFFLE COMPILED CROWDSALE DETAILS
  const CROWDSALE_ARTIFACT = await lib.contract_artifact("iTokenCrowdSale");
  // const CROWDSALE_BYTECODE = CROWDSALE_ARTIFACT.bytecode;
  const CROWDSALE_ABI = CROWDSALE_ARTIFACT.abi;


  const encodedParameters = await web3.eth.abi
    .encodeParameters(
      ["uint256", "address", "address"],
      [500, ACCT1, TOKEN_ADDRESS]
    )
    .slice(2);

  const bytecodeWithEncodedParameters = CROWDSALE_BYTECODE + encodedParameters;

  let txnObject = await lib.deploy_contract_object(
    ACCT1,
    bytecodeWithEncodedParameters
  );

  // Sign the transaction
  const tx = new Tx(
    txnObject
    // ,{chain:'ropsten'}
  );
  tx.sign(PRV_KEY1);
  // console.log("txnobject",txnObject);

  // Convert to RLP encoding
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("err:", err, "txHash:", txHash);
  });
})();
