import { Middleware } from "redux";
import { UserSlice } from "../redux/slices/UserSlice";
import { NetworkApi } from "../redux/network";

const RootDirectoryMiddleware: Middleware = (store) => (next) => (action) => {
    if(NetworkApi.endpoints.getUserState.matchFulfilled(action)) {
        const rootDirectoryId = action.payload.data?.rootDirectoryId;
        
    }
}