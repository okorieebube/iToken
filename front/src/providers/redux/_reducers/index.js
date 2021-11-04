// REDUCERS
import { combineReducers } from "redux";
import { FetchTokenArtifactReducer } from "./token-details-reducer";

export default combineReducers({
  FetchTokenArtifact: FetchTokenArtifactReducer,
});
