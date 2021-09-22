const iToken = artifacts.require("iToken");
const iTokenCrowdsale = artifacts.require("iTokenCrowdsale");
const { chaiBignumber: BN } = require("chai-bignumber");
const { assert, expect } = require("chai").use(require('chai-bignumber')(BN)).should();




contract("iTokenCrowdsale", function ([deployer, user]) {

  // TOKEN CONFIG
  const NAME = "iToken";
  const SYMBOL = "ITK";
  const DECIMAL = 18;
  // const TOKEN = null;

  // CROWDSALE CONFIG
  const RATE = 500;   //  how many of the token can you get for one Ether
  const WALLET = user;

  // this runs before each `it` test function
  beforeEach(async () => {
    this.token = await iToken.new(NAME, SYMBOL, DECIMAL);
    // console.log(this.token.address)
    this.crowdsale = await iTokenCrowdsale.new(RATE, WALLET, this.token.address);
  });


  describe('Test for Crowdsale details', function () {
    it("checks if token is deployed", async () => {
      let ITK = await iToken.deployed();
    });
    it("checks if crowdsale contract is deployed", async () => {
      let iTkCrowdsale = await iTokenCrowdsale.deployed();
    });
    // it('checks if crowdsale address is correct', async function () {
    //   let token = await this.crowdsale;
    //   console.log(this.crowdsale.name)
    //   token.should.equal(this.crowdsale.address)
    // })

    // it('checks for rate', async function () {
    //   let rate = await this.crowdsale.rate();
    //   // console.log(this.crowdsale)
    //   rate.should.equal(this.rate)
    // })
  })

});
