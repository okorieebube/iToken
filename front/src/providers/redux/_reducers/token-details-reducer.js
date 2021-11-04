import { TokenConstants } from "../_constants/token-constants";

const { FETCH_ARTIFACT_REQUEST, FETCH_ARTIFACT_SUCCESS, FETCH_ARTIFACT_FAILURE } =
  TokenConstants;


  
export function FetchTokenArtifactReducer(state={}, action) {
    switch (action.type) {
        case FETCH_ARTIFACT_REQUEST:
            return {...state, loading: true}
        case FETCH_ARTIFACT_SUCCESS:
            return {...state, success: action.payload, loading: false}
        case FETCH_ARTIFACT_FAILURE:
            return {...state, error: action.payload, loading: false}
        default:
            return state;
    }
}