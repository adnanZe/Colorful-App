import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState: BoxesState = {
  boxList: [],
  selectedBoxNumber: null,
  isMaximum: false,
};

export interface BoxesState {
  boxList: BoxItem[];
  selectedBoxNumber: string | null;
  isMaximum: boolean;
}

export interface BoxItem {
  red: string;
  green: string;
  blue: string;
  creationTime: string;
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
          red: action.payload.red,
          green: action.payload.green,
          blue: action.payload.blue,
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

    boxDeleted(state) {
      const newBoxList = state.boxList.filter(
        (box: BoxItem) => box.boxId !== state.selectedBoxNumber
      );

      newBoxList.forEach((box: BoxItem, index: number) => {
        box.boxNumber = String(index + 1);
      });

      state.boxList = newBoxList;
      state.selectedBoxNumber = null;
      state.isMaximum = false;
    },
  },
});

export const { boxAdded, boxSelected, boxDeleted, boxUpdated } =
  boxSlice.actions;

export const boxReducer = boxSlice.reducer;
