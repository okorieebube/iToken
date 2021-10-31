const Web3 = require('web3');
const myContract = require('../../../server/build/contracts/myContract.json');


(async()=>{
    const web3 = new Web3('http://127.0.0.1:9545');
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = myContract.networks[networkId];
    const contract = new web3.eth.Contract(myContract.abi, deployedNetwork.address)
    // console.log(contract);return;

    const res = await contract.methods.getdata().call();

    console.log(res)


})();
