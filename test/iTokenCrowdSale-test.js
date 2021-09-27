const iToken = artifacts.require("iToken");
const iTokenCrowdsale = artifacts.require("iTokenCrowdsale");
const { BigNumber: BN } = require("bignumber.js");
const Web3 = require("web3-utils");
import { ether } from './helpers/ether';
const chai = require("chai")
  .use(require('chai-as-promised')).should();
const assert = require('chai').assert;





contract("iTokenCrowdsale", function ([deployer, wallet, investor1, investor2]) {

  // TOKEN CONFIG
  const NAME = "iToken";
  const SYMBOL = "ITK";
  const DECIMAL = 18;

  // CROWDSALE CONFIG
  const RATE = 500;   //  How many of the token can you get for one Ether?
  const WALLET = wallet;  //  Address for accepting crowdsale funds


  var TOKEN, CROWDSALE;

  // this runs before each `it` test function
  beforeEach(async function () {
    TOKEN = await iToken.new(NAME, SYMBOL, DECIMAL);
    CROWDSALE = await iTokenCrowdsale.new(RATE, WALLET, TOKEN.address);

    // Crowdsale cant mint token because, its not the owner of the token. 
    // So we need to transfer ownership of token to our crowdsale address.
    let add_new_minter = await TOKEN.addMinter(TOKEN.address);


    let minter = await TOKEN.addMinter(CROWDSALE.address, { from: deployer });  // transfer token minter role to crowdsale
    let balance = await TOKEN.balanceOf(CROWDSALE.address);
    // console.log({ balance: balance.toString() })
  });

  describe('Crowdsale configurations', function () {
    it("checks if token is deployed", async () => {
      let ITK = await iToken.deployed();
    });

    it("checks if crowdsale rate is set", async () => {
      let rate = await CROWDSALE.rate();
      RATE.should.equal(Number(rate))
    });

    // checks if token that the crowdsale is selling equals the token we deployed in beforeEach
    it('checks if crowdsale token is correct', async () => {
      let token = await CROWDSALE.token();
      token.should.equal(TOKEN.address)
    })

  })

  describe('Crowdsale Minting', () => {

    it("crowdsale is minting token", async () => {
      let originalTotalSupply = await TOKEN.totalSupply();
      await CROWDSALE.buyTokens(investor1, { value: ether('1'), from: investor1 });
      let newTotalSupply = await TOKEN.totalSupply();
      assert.isTrue(newTotalSupply > originalTotalSupply)
      // assert.fail('foo is not bar');


    })

  })


  describe('Accepting payments', function () {
    it('should accept payments', async function () {
      let val = ether('1');
      let buy_tokens = await CROWDSALE.buyTokens(investor1, { value: val, from: investor1 }).should.be.fulfilled;
      // console.log(txn)
    })
  })


});
