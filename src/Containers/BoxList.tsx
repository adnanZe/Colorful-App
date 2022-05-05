import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../Store';
import { BoxItem, boxSelected } from '../Store/Store';

function BoxList(): JSX.Element {
  const boxesState = useSelector(store.getState);
  const dispatch = useDispatch();

  return (
    <article id="box-list">
      <h3>Box List</h3>
      {boxesState.box.boxList.map((box: BoxItem) => {
        return (
          <li
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => dispatch(boxSelected({ boxId: box.boxId }))}
            style={{
              backgroundColor: `rgb(${box.red}, ${box.green}, ${box.blue} )`,
            }}
            className={
              boxesState.box.selectedBoxNumber === box.boxId ? 'active' : ''
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
