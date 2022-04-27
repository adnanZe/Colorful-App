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

export interface BoxState {
  boxList: Array<BoxItem>;
  selectedBoxNumber: string | null;
  isMaximum: boolean;
  isSelected: boolean;
}

const initialState: BoxState = {
  boxList: [],
  selectedBoxNumber: null,
  isMaximum: false,
  isSelected: false,
};

const boxReducer = (state = initialState, action: BoxAction): BoxState => {
  switch (action.type) {
    case BoxActionTypes.BoxAdded: {
      if (state.boxList.length === 9) {
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
      if (!state.selectedBoxNumber) {
        return state;
      }

      const boxSelected = state.boxList.find(
        (box: BoxItem) => box.boxId == state.selectedBoxNumber
      );
      const boxIdSelected = state.boxList.findIndex(
        (box: BoxItem) => boxSelected == box
      );

      return {
        isSelected: false,
        isMaximum: false,
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
        isSelected: true,
      };
    }

    case BoxActionTypes.BoxDeleted: {
      return {
        ...state,
        boxList: [
          ...state.boxList.filter(
            (box: BoxItem) => box.boxId != state.selectedBoxNumber
          ),
        ],
        isSelected: false,
        isMaximum: false,
        selectedBoxNumber: null,
      };
    }

    default:
      return state;
  }
};

export const getBoxItemSelected = (state: BoxState): BoxItem | undefined => {
  const boxSelected = state.boxList.find(
    (box: BoxItem) => box.boxId == state.selectedBoxNumber
  );

  return boxSelected;
};

export const getBoxList = (state: BoxState): BoxItem[] | undefined => {
  return state.boxList;
};

export const getIsMaximum = (state: BoxState): boolean => {
  return state.isMaximum;
};

export const getIsSelected = (state: BoxState): boolean => {
  return state.isSelected;
};

export default boxReducer;
