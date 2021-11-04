import { Request } from "../../../providers/api/http";
const fs = require("fs");
// import * as fs  from "fs";
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:9545");

export default async function contract_artifact (file_name){
    // return 'man';
    let rawCodeFs = await fs.readFileSync(
        `${"../../../../../server/build/contracts/"}${file_name}.json`
        // 'test-artifacts.js'
      );
    //   console.log(rawCodeFs);return;
      let rawcode = await JSON.parse(rawCodeFs.toString());
      return rawcode;
}



export const token_contract = async () => {
    

    let myContract = Request.get("../../../../../server/build/contracts/iToken.json");
    // let myContract = await contract_artifact('iToken');
    console.log(myContract);return;
    try {

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = myContract.networks[networkId];
        const contract = new web3.eth.Contract(
          myContract.abi,
          deployedNetwork.address
        );
        // console.log(contract);return;
      
        const res = await contract.methods.getdata().call();
      
        console.log(res);

    } catch (err) {
        console.log(err)
    }
};

