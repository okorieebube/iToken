const iToken = artifacts.require("iToken");
const iTokenCrowdsale = artifacts.require("iTokenCrowdsale");
// const { chaiBignumber: BN } = require("chai-bignumber");
const { BigNumber: BN } = require("bignumber.js");
const Web3 = require("web3-utils");
// const { default: ether } = require("./helpers/ether");
const { assert, expect } = require("chai").use(require('chai-bignumber')(BN)).should();




contract("iTokenCrowdsale", function ([deployer, user]) {

  // TOKEN CONFIG
  const NAME = "iToken";
  const SYMBOL = "ITK";
  const DECIMAL = 18;

  // CROWDSALE CONFIG
  const RATE = 500;   //  how many of the token can you get for one Ether
  const WALLET = user;

  
  var TOKEN, CROWDSALE;

  describe('Test for Crowdsale details', function () {

    // this runs before each `it` test function
    beforeEach(async function () {
      TOKEN = await iToken.new(NAME, SYMBOL, DECIMAL);
      CROWDSALE = await iTokenCrowdsale.new(RATE, WALLET, TOKEN.address);
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
      let val = BN(Web3.toWei('1', 'ether'));
      let weiRaised = await iTkCrowdsale.weiRaised();
      // console.log(weiRaised)
    })
  })

});
