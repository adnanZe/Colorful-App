export enum BoxActionTypes {
    BoxAdded = 'BOX_ADDED',
    BoxSelected = 'BOX_SELECTED',
}

interface BoxAddPayload {
    red: string,
    green: string,
    blue: string,
}

interface BoxSelectedPayload {
    boxId: string,
}

interface BoxAdded {
    type: typeof BoxActionTypes.BoxAdded,
    payload: BoxAddPayload,
}

interface BoxSelected {
    type: typeof BoxActionTypes.BoxSelected,
    payload: BoxSelectedPayload,
}

export const boxAdded = (payload: BoxAddPayload) : BoxAdded => ({
    type: BoxActionTypes.BoxAdded,
    payload,
});

export const boxSelected = (payload: BoxSelectedPayload) : BoxSelected => ({
    type: BoxActionTypes.BoxSelected,
    payload,
});

export type BoxAction = BoxAdded | BoxSelected;

