import { v4 } from 'uuid';
import { BoxAction, BoxActionTypes } from './Actions';

export interface BoxItem {
  red: string;
  green: string;
  blue: string;
  creationTime: Date;
  boxNumber: string;
  boxId: string;
}

export interface BoxItemRGB {
  red: string;
  green: string;
  blue: string;
}

export interface BoxesState {
  boxList: BoxItem[];
  selectedBoxNumber: string | null;
  isMaximum: boolean;
}

const initialState: BoxesState = {
  boxList: [],
  selectedBoxNumber: null,
  isMaximum: false,
};

const MAX_NUMBER_BOXES = 9;

const boxReducer = (state = initialState, action: BoxAction): BoxesState => {
  switch (action.type) {
    case BoxActionTypes.BoxAdded: {
      if (state.boxList.length === MAX_NUMBER_BOXES) {
        return {
          ...state,
          isMaximum: true,
        };
      }

      return {
        ...state,
        isMaximum: false,
        boxList: [
          ...state.boxList,
          {
            ...action.payload,
            creationTime: new Date(),
            boxNumber: String(state.boxList.length + 1),
            boxId: v4(),
          },
        ],
      };
    }

    case BoxActionTypes.BoxUpdate: {
      const boxIdSelected = state.boxList.findIndex(
        (box: BoxItem) => box.boxId == state.selectedBoxNumber
      );

      return {
        ...state,
        selectedBoxNumber: null,
        boxList: [
          ...state.boxList.slice(0, boxIdSelected),
          {
            ...state.boxList[boxIdSelected],
            ...action.payload,
          },
          ...state.boxList.slice(boxIdSelected + 1),
        ],
      };
    }

    case BoxActionTypes.BoxSelected: {
      return {
        ...state,
        selectedBoxNumber: action.payload.boxId,
      };
    }

    case BoxActionTypes.BoxDeleted: {
      const newStateBoxDeleted = {
        ...state,
        boxList: [
          ...state.boxList.filter(
            (box: BoxItem) => box.boxId != state.selectedBoxNumber
          ),
        ],
        isMaximum: false,
        selectedBoxNumber: null,
      };

      return {
        ...newStateBoxDeleted,
        ...newStateBoxDeleted.boxList.map((box: BoxItem, index: number) => {
          box.boxNumber = String(index + 1);

          return box;
        }),
      };
    }

    default:
      return state;
  }
};

export const getBoxItemRgbSelected = (state: BoxesState): BoxItemRGB | null => {
  const boxSelected = state.boxList.find(
    (box: BoxItem) => box.boxId == state.selectedBoxNumber
  );

  const boxItemRgb = {
    red: '',
    green: '',
    blue: '',
  };

  if (boxSelected) {
    boxItemRgb.red = boxSelected.red;
    boxItemRgb.green = boxSelected.green;
    boxItemRgb.blue = boxSelected.blue;
  }

  return boxItemRgb || null;
};

export const getBoxItemNumberSelected = (state: BoxesState): string | null => {
  const boxSelected = state.boxList.find(
    (box: BoxItem) => box.boxId == state.selectedBoxNumber
  );

  return boxSelected?.boxNumber || null;
};

export const getBoxItemSelected = (state: BoxesState): BoxItem | null => {
  const boxSelected = state.boxList.find(
    (box: BoxItem) => box.boxId == state.selectedBoxNumber
  );

  return boxSelected || null;
};

export const getBoxList = (state: BoxesState): BoxItem[] => {
  return state.boxList;
};

export const getIsMaximum = (state: BoxesState): boolean => {
  return state.isMaximum;
};

export default boxReducer;
