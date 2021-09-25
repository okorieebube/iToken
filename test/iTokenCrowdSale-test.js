const iToken = artifacts.require("iToken");
const iTokenCrowdsale = artifacts.require("iTokenCrowdsale");
const { BigNumber: BN } = require("bignumber.js");
const Web3 = require("web3-utils");
import { ether } from './helpers/ether';
const { assert, expect } = require("chai").use(require('chai-bignumber')(BN)).should();
const truffleAssert = require('truffle-assertions');





contract("iTokenCrowdsale", function ([token_deployer, wallet, investor1, investor2]) {

  // TOKEN CONFIG
  const NAME = "iToken";
  const SYMBOL = "ITK";
  const DECIMAL = 18;

  // CROWDSALE CONFIG
  const RATE = 500;   //  How many of the token can you get for one Ether?
  const WALLET = wallet;  //  Address for accepting crowdsale funds


  var TOKEN, CROWDSALE;

  describe('Test for Crowdsale details', function () {

    // this runs before each `it` test function
    beforeEach(async function () {
      TOKEN = await iToken.new(NAME, SYMBOL, DECIMAL);
      CROWDSALE = await iTokenCrowdsale.new(RATE, WALLET, TOKEN.address);

      // Crowdsale cant mint token because, its not the owner of the token. 
      // So we need to transfer ownership of token to our crowdsale address.
      console.log(TOKEN.address)
      let add_new_minter = await TOKEN.addMinter(TOKEN.address);

      // truffleAssert.eventEmitted(add_new_minter, 'MinterAdded', (ev) => {
      //   console.log(ev);
      // });

      // console.log(CROWDSALE.address)
      // console.log(minter)
      let minter = await TOKEN.addMinter(CROWDSALE.address, { from: token_deployer });  // transfer token minter role to crowdsale
      // console.log(investor1)
      // console.log(minter)
      // await TOKEN.renounceMinter();   // remove token deployer from minter role
    });



    it("checks if token is deployed", async () => {
      let ITK = await iToken.deployed();
    });

    it("checks if crowdsale contract is deployed", async () => {
      let iTkCrowdsale = await iTokenCrowdsale.deployed();
      let rate = await iTkCrowdsale.rate();
      // console.log(iTkCrowdsale.address)
    });

    // checks if token that the crowdsale is selling equals the token we deployed in beforeEach
    it('checks if crowdsale token is correct', async () => {
      let token = await CROWDSALE.token();
      token.should.equal(TOKEN.address)
    })

  })

  describe('Accepting payments', function () {
    it('should accept payments', async function () {
      let iTkCrowdsale = await iTokenCrowdsale.deployed();
      // let val = BN(Web3.toWei('1', 'ether'));
      let val = ether('1');
      // let txn = await iTkCrowdsale.buyTokens({value:val, from:investor1});
      let txn = await iTkCrowdsale.buyTokens(investor1, { value: val, from: CROWDSALE.address });
      console.log(txn)
    })
  })

});
