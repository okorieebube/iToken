const Web3 = require("web3");
const myContract = require("../../../server/build/contracts/sendEtherContract.json");

(async () => {
  const web3 = new Web3("http://127.0.0.1:9545");
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = myContract.networks[networkId];

  const contract = new web3.eth.Contract(
    myContract.abi,
    deployedNetwork.address
  );
  const addresses = await web3.eth.getAccounts();

  await contract.methods.sendEther().send({
    from: addresses[0],
    value: web3.utils.toBN(100000),
  });

  let functn_res = await contract.methods.functionCalled().call();
  // console.log(functn_res)

  // this sends data to the contract address
  await web3.eth.sendTransaction({
    from: addresses[0],
    to: contract.options.address, // contracts address
    value: web3.utils.toBN(100000),
  });

  
  await web3.eth.sendTransaction({
    from: addresses[0],
    to: addresses[1], 
    value: web3.utils.toBN(100000),
  });



})();
