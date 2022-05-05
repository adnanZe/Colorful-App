import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState: BoxesState = {
  boxList: [],
  selectedBoxNumber: null,
  isMaximum: false,
};

interface BoxesState {
  boxList: BoxItem[];
  selectedBoxNumber: string | null;
  isMaximum: boolean;
}

export interface BoxItem {
  red: string;
  green: string;
  blue: string;
  creationTime: Date;
  boxNumber: string;
  boxId: string;
}

const MAX_NUMBER_BOXES = 9;

function getDate() {
  const dateNow = new Date();

  return dateNow.toLocaleTimeString();
}

const boxSlice = createSlice({
  name: 'boxRGB',
  initialState,
  reducers: {
    boxAdded: (state, action) => {
      if (state.boxList.length === MAX_NUMBER_BOXES) {
        state.isMaximum = true;
      } else {
        state.boxList.push({
          ...action.payload,
          boxNumber: String(state.boxList.length + 1),
          boxId: v4(),
          creationTime: getDate(),
        });
      }
    },
    boxSelected: (state, action) => {
      state.selectedBoxNumber = action.payload.boxId;
    },

    boxUpdated: (state, action) => {
      const boxIdSelected = state.boxList.find(
        (box: BoxItem) => box.boxId == state.selectedBoxNumber
      );
      if (action.payload && boxIdSelected) {
        boxIdSelected.red = action.payload.red;
        boxIdSelected.green = action.payload.green;
        boxIdSelected.blue = action.payload.blue;
      }
    },

    boxDeleted: (state) => {
      state.boxList.filter(
        (box: BoxItem) => box.boxId !== state.selectedBoxNumber
      );
    },
  },
});

export const { boxAdded, boxSelected, boxDeleted, boxUpdated } =
  boxSlice.actions;

export const boxReducer = boxSlice.reducer;

export const getBoxItemSelected = (state: BoxesState): BoxItem | null => {
  const boxSelect = state.boxList?.find(
    (box: BoxItem) => box.boxId == state.selectedBoxNumber
  );

  return boxSelect || null;
};

export const getBoxList = (state: BoxesState): BoxItem[] => {
  return state.boxList;
};

export const getIsMaximum = (state: BoxesState): boolean => {
  return state.isMaximum;
};
