/* 
deploy crowdsale contract
buy and mint token
 */
// const { ether } =  require('../../server/test/helpers/ether');
const {
  abi,
  ropsten_node,
  ganache_node,
  ACCT1,
  ACCT2,
  PRV_KEY_1,
  ACCT3,
  PRV_KEY_3,
  CROWDSALE_BYTECODE
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
  const TOKEN_ADDRESS = '0x356468dAF1a5b53e020193dc47F61Be1Ff6C1bce';

  // rate, wallet, token
/*   
    const encodedParameters = await web3.eth.abi
      .encodeParameters(["uint256", "address", "address"], [500, ACCT2, TOKEN_ADDRESS])
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
    // console.log(txnObject);return;

    // Convert to RLP encoding
    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log("err:", err, "txHash:", txHash);
    });
 */

    

  
  // BUY TOKEN
let crowdsale_address = "0xdF8239CB8CAdfd3Cd9a9EfAdc046c59fbC940054";
let crowdsaleContract = new web3.eth.Contract(CROWDSALE_ABI, crowdsale_address);

let contractABI = abi;
let iTokenContract = new web3.eth.Contract(contractABI, TOKEN_ADDRESS);

// make_token_minter 
// await iTokenContract.methods.addMinter(TOKEN_ADDRESS);
//  make_crowdsale_minter 
await iTokenContract.methods.addMinter(crowdsale_address).send({ from: ACCT1 });  // transfer token minter role to crowdsale


let amt_in_eth = '1';
let amt_in_wei = web3.utils.toWei(amt_in_eth, "ether");
let acctTxCount = await web3.eth.getTransactionCount(ACCT3);

// console.log({ACCT3, amt_in_wei});

let buyToken = await crowdsaleContract.methods.buyTokens(ACCT3).send({from: ACCT3, value: amt_in_wei});
// let buyTokenTxn = await lib.transaction(crowdsaleContract, ACCT3,amt_in_eth,crowdsale_address,buyToken, PRV_KEY3);
console.log(buyToken);



})();
