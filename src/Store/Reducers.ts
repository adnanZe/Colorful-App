import { v4 } from 'uuid'; 
import {BoxAction, BoxActionTypes} from './Actions'

 export interface BoxItem {
    red: string,
    green: string,
    blue: string,
    creationTime: Date;
    boxNumber: string;
    boxId: string;
}

 export interface BoxState {
    boxList: Array<BoxItem>,
    selectedBoxNumber: string | null;
}


const initialState: BoxState = {
    boxList: [],
    selectedBoxNumber: null,
}

let lastId = 0;

export const boxReducer = (state = initialState, action: BoxAction): BoxState => {
    switch (action.type) {
        case BoxActionTypes.BoxAdded : {
            if(state.boxList.length === 9){
                state.boxList.shift();
            }

            return {
                ...state,
                boxList: [
                    ...state.boxList,
                    {
                    red: action.payload.red,
                    green: action.payload.green,
                    blue: action.payload.blue,
                    creationTime: new Date(),
                    boxNumber: String(++lastId),
                    boxId: v4(),
                }],
            }
        }

        case BoxActionTypes.BoxSelected : {
            return {
                ...state,
                selectedBoxNumber : action.payload.boxId,
            }
        }

        default: 
            return state
    }
}

export default boxReducer;