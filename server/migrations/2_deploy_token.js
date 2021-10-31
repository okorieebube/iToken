const iToken = artifacts.require("iToken");
const iTokenCrowdsale = artifacts.require("iTokenCrowdsale");
// const myContract = artifacts.require("myContract");
// const sendEtherContract = artifacts.require("sendEtherContract");

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
        // transfer the minter role from this contract (the default)
        // to the crowdsale, so it can mint tokens


        await ITK.addMinter(iTkCrowdsale.address);
        // ITK.renounceMinter();
        console.log("isMinter", await ITK.isMinter(iTkCrowdsale.address), "address",iTkCrowdsale.address);


  /* 
  await deployer.deploy(myContract);
  const my_contract = await myContract.deployed();

  await deployer.deploy(sendEtherContract);
  const send_Ether_Contract = await sendEtherContract.deployed();
   */
};
