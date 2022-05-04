import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { boxSelected } from '../Store/Actions';
// import { BoxItem, getBoxItemSelected, getBoxList } from '../Store/Reducers';
import { store } from '../Store_toolkit';
import { BoxItem, boxSelected } from '../Store_toolkit/StoreReducer';

function BoxList(): JSX.Element {
  // const boxItems = useSelector(getBoxList);
  // const boxActive = useSelector(getBoxItemSelected);
  const boxStore = useSelector(store.getState);
  const dispatch = useDispatch();

  return (
    <article id="box-list">
      <h3>Box List</h3>
      {boxStore.box.boxList?.map((box: BoxItem) => {
        return (
          <li
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => dispatch(boxSelected({ boxId: box.boxId }))}
            style={{
              backgroundColor: `rgb(${box.red}, ${box.green}, ${box.blue} )`,
            }}
            className={
              boxStore.box.selectedBoxNumber == box.boxId ? 'active' : ''
            }
            id={box.boxId}
            key={box.boxId}
          ></li>
        );
      })}
    </article>
  );
}

export default BoxList;
