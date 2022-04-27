export enum BoxActionTypes {
  BoxAdded = 'BOX_ADDED',
  BoxSelected = 'BOX_SELECTED',
  BoxUpdate = 'BOX_UPDATE',
  BoxDeleted = 'BOX_DELETED',
}

interface BoxAddPayload {
  red: string;
  green: string;
  blue: string;
}

interface BoxSelectedPayload {
  boxId: string;
}

interface BoxAdded {
  type: typeof BoxActionTypes.BoxAdded;
  payload: BoxAddPayload;
}

interface BoxSelected {
  type: typeof BoxActionTypes.BoxSelected;
  payload: BoxSelectedPayload;
}

interface BoxUpdated {
  type: typeof BoxActionTypes.BoxUpdate;
  payload: BoxAddPayload;
}

interface BoxDeleted {
  type: typeof BoxActionTypes.BoxDeleted;
}

export const boxAdded = (payload: BoxAddPayload): BoxAdded => ({
  type: BoxActionTypes.BoxAdded,
  payload,
});

export const boxSelected = (payload: BoxSelectedPayload): BoxSelected => ({
  type: BoxActionTypes.BoxSelected,
  payload,
});

export const boxUpdated = (payload: BoxAddPayload): BoxUpdated => ({
  type: BoxActionTypes.BoxUpdate,
  payload,
});

export const boxDeleted = (): BoxDeleted => ({
  type: BoxActionTypes.BoxDeleted,
});

export type BoxAction = BoxAdded | BoxSelected | BoxUpdated | BoxDeleted;
