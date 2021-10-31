const Web3 = require("web3");
const myContract = require("../../../server/build/contracts/myContract.json");

(async () => {

  const web3 = new Web3("http://127.0.0.1:9545");
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = myContract.networks[networkId];
  // console.log(deployedNetwork);return;
  const contract = new web3.eth.Contract(
    myContract.abi,
    deployedNetwork.address
  );
  const addresses = await web3.eth.getAccounts();

  const res = await contract.methods
    .setData(10)
    .send({
      from: addresses[0],
      // gas: users wallets set this automatically,
      // and if its not set web3 calcs. a gasPrice
      // and sets it by default.
    })
    .on("reciept", (reciept) => {})
    .on("confirmation", (confirmationNo, reciept) => {})
    .on("error", (err, reciept) => {});


  console.log(res);
})();
