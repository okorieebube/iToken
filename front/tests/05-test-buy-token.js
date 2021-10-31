const Web3 = require("web3");
const token_artifacts = require("../../server/build/contracts/iToken.json");
const crowdsale_artifacts = require("../../server/build/contracts/iTokenCrowdSale.json");

(async () => {
  const web3 = new Web3("http://127.0.0.1:9545");
  const networkId = await web3.eth.net.getId();
  const tokenDeployedNetwork = token_artifacts.networks[networkId];
  const crowdsaleDeployedNetwork = crowdsale_artifacts.networks[networkId];
  const address = await web3.eth.getAccounts();
  const token_contract = new web3.eth.Contract(
    token_artifacts.abi,
    tokenDeployedNetwork.address
  );
  const crowdsale_contract = new web3.eth.Contract(
    crowdsale_artifacts.abi,
    crowdsaleDeployedNetwork.address
  );

  console.log('crowdsale', crowdsale_contract.options.address)

//   await token_contract.methods
//     .addMinter(token_contract.options.address)
//     .send();

    
  let isMinter = await token_contract.methods
  .isMinter(crowdsale_contract.options.address)
  .call();
  console.log("isMinter", isMinter, "address",crowdsale_contract.options.address);


//   let amt = web3.utils.toBN(100000);
//   let buyToken = await crowdsale_contract.methods
//     .buyTokens(address[2])
//     .send({ from: address[2], value: amt })
//     .on("error", (err, reciept) => {
//       console.log({ err });
//     });


    // let investor_bal = await token_contract.methods.totalSupply().call();
    // console.log(investor_bal)
})();
