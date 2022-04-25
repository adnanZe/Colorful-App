import { uuid } from 'uuidv4'; 
import {BoxAction, BoxActionTypes} from './Actions'

 interface BoxItem {
    red: string,
    green: string,
    blue: string,
    creationTime: Date;
    boxNumber: string;
    boxId: string;
}

 export interface BoxState {
    boxList: Array<BoxItem>,
    selectedBoxNumber: number | null;
}


const initialState: BoxState = {
    boxList: [],
    selectedBoxNumber: null,
}

let lastId = 0;

export const boxReducer = (state = initialState, action: BoxAction): BoxState => {
    switch (action.type) {
        case BoxActionTypes.BoxAdded : {
            return {
                ...state,
                boxList: [{
                    red: action.payload.red,
                    green: action.payload.green,
                    blue: action.payload.blue,
                    creationTime: new Date(),
                    boxNumber: String(++lastId),
                    boxId: uuid(),
                }],
                selectedBoxNumber : null,
            }
        }

        default: 
            return state
    }
}

export default boxReducer;