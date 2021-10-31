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
    CROWDSALE_ADDRESS
  } = require("./test-artifacts");
  const lib = require("../src/lib/web3-libs");
  const Web3 = require("web3");
  const web3 = new Web3(ganache_node);
  const web3Utils = require("web3-utils");
  var Tx = require("ethereumjs-tx").Transaction;
  const { BigNumber: BN } = require("bignumber.js");
  
  const PRV_KEY1 = Buffer.from(PRV_KEY_1, "hex");
  const PRV_KEY3 = Buffer.from(PRV_KEY_3, "hex");

(async()=>{
    
  // GET TRUFFLE COMPILED CROWDSALE DETAILS
  const CROWDSALE_ARTIFACT = await lib.contract_artifact("iTokenCrowdSale");
  // const CROWDSALE_BYTECODE = CROWDSALE_ARTIFACT.bytecode;
  const CROWDSALE_ABI = CROWDSALE_ARTIFACT.abi;

    
  // BUY TOKEN
  let crowdsaleContract = new web3.eth.Contract(CROWDSALE_ABI, CROWDSALE_ADDRESS);
  let iTokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

  // transfer token minter role to crowdsale
  let addMinter = await iTokenContract.methods.addMinter(CROWDSALE_ADDRESS).send({ from: ACCT1 });  


  let amt_in_eth = '1';
  let amt_in_wei = BN(web3.utils.toWei(amt_in_eth, "ether"));
  let acctTxCount = await web3.eth.getTransactionCount(ACCT3);

  // console.log({ACCT3, amt_in_wei});

  let buyToken = await crowdsaleContract.methods.buyTokens(ACCT3).send({from: ACCT3, value: amt_in_wei});
  // let buyTokenTxn = await lib.transaction(crowdsaleContract, ACCT3,amt_in_eth,CROWDSALE_ADDRESS,buyToken, PRV_KEY3);
  console.log(buyToken);

})();

