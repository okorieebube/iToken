const Web3 = require("web3");
const event_artifacts = require("../../../server/build/contracts/eventsContract.json");

(async () => {
  const web3 = new Web3("http://127.0.0.1:9545");
  const networkId = await web3.eth.net.getId();
  const eventsContractDeployedNetwork = event_artifacts.networks[networkId];

  const eventsContract = new web3.eth.Contract(
    event_artifacts.abi,
    eventsContractDeployedNetwork.address
  );
  const addresses = await web3.eth.getAccounts();

  // Reading events you trigerred
/*   let res = await eventsContract.methods.emitEvent("damn!").send({
    from: addresses[0],
  });
  console.log(res.events); */

  //   Reading past events
/*   let res = await eventsContract.getPastEvents("myEvent", {
    fromBlock: 0,
  });
  console.log(res); */

  
  //   Reading specific past events. i.e. like a SELECT WHERE.
  let res = await eventsContract.getPastEvents("myEvent", {
    fromBlock: 0,
    filter:{
        value:"damn!",    // ['damn!', 'nigga']
    }
  });
  console.log(res);



})();
