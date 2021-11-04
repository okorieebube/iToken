import { Request } from "../api/http";
import { headers } from "../api/headers";
import { token_contract } from "../../lib/web3/contracts/load_contracts";




export const TokenService = {
  fetch_artifact: async () => {
    return token_contract();
  },
};
