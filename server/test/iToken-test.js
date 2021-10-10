const { assert, expect } = require("chai");
const { default: Web3 } = require("web3");
// const { BN } = require("@openzeppelin/test-helpers");


const iToken = artifacts.require("iToken");
require("chai").should();

contract("iToken", (accounts) => {
  const _name = "iToken";
  const _symbol = "ITK";
  const _decimals = 18;
  var TOKEN;
  // const _initialSupply = new BN('1000000000000000000000000')

  beforeEach(async () => {
    // .new : deploys a new contract version to network and returns a new instance of it.
    TOKEN = await iToken.new(_name, _symbol, _decimals);
  });

  // Describe - to describe what a group of tests will do.
  describe("Test for token details", () => {
    // It - used to describe each unit test.
    it("is deployed", async () => {
      // .deployed : creates a contract instance rep. the default address managed by contract. [prob. default address it was deployed to]
      let ITK = await iToken.deployed();
    });

    it("has correct name", async () => {
      let name = await TOKEN.name();
      name.should.equal(_name);
    });
    it("has correct symbol", async () => {
      let symbol = await TOKEN.symbol();
      // symbol.should.equal(_symbol);
      assert.equal(_symbol, symbol);
    });
    it("has correct decimal", async () => {
      let decimals = await TOKEN.decimals();
      decimals.words[0].should.equal(18);
      // expect(await this.token.decimals()).to.be.bignumber.equal("18");
    });
  });
});
