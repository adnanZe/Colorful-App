import { createStore, Store, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { BoxAction } from "./Actions";
import boxReducer, { BoxState } from "./Reducers";


// type RootState = ReturnType<typeof store.getState>
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AnyAction, unknown, RootState>

const store: Store = createStore(
    boxReducer, 
    composeWithDevTools(
        applyMiddleware(thunk as ThunkMiddleware<BoxState, BoxAction>)
    )
);

export default store;