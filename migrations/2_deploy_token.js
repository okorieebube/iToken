const iToken = artifacts.require("iToken");
const iTokenCrowdsale = artifacts.require("iTokenCrowdsale");

module.exports = async function (deployer, network, accounts) {
  const NAME = "iToken";
  const SYMBOL = "ITK";
  const DECIMALS = 18;

  const RATE = 500;   //  how many of the token can you get for one Ether
  const WALLET = accounts[0];

  // Deploy a single contract with constructor arguments
  await deployer.deploy(iToken, NAME, SYMBOL, DECIMALS);
  const ITK = await iToken.deployed();



  await deployer.deploy(iTokenCrowdsale, RATE, WALLET, ITK.address);
  const iTkCrowdsale = await iTokenCrowdsale.deployed();
};
