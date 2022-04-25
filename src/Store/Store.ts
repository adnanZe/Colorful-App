import { createStore, Store, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { BoxAction } from "./Actions";
import boxReducer, { BoxState } from "./Reducers";

const store: Store = createStore(
    boxReducer, 
    composeWithDevTools(
        applyMiddleware(thunk as ThunkMiddleware<BoxState, BoxAction>)
    )
);


export default store;