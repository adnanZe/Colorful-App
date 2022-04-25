export enum BoxActionTypes {
    BoxAdded = 'BOX_ADDED',
    BoxSelected = 'BOX_SELECTED',
}

interface BoxPayload {
    red: string,
    green: string,
    blue: string,
}

interface BoxAdded {
    type: typeof BoxActionTypes.BoxAdded,
    payload: BoxPayload,
}

interface BoxSelected {
    type: typeof BoxActionTypes.BoxSelected
}

export const boxAdded = (payload: BoxPayload) : BoxAdded => ({
    type: BoxActionTypes.BoxAdded,
    payload,
});

export const boxSelected = () : BoxSelected => ({
    type: BoxActionTypes.BoxSelected,
});

export type BoxAction = BoxAdded | BoxSelected;

