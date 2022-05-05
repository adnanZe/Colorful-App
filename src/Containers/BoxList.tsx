import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boxSelected } from '../Store/Actions';
import {
  BoxItem,
  getBoxItemNumberSelected,
  getBoxList,
} from '../Store/Reducers';

function BoxList(): JSX.Element {
  const boxItems = useSelector(getBoxList);
  const boxActive = useSelector(getBoxItemNumberSelected);
  const dispatch = useDispatch();

  return (
    <article id="box-list">
      <h3>Box List</h3>
      {boxItems.map((box: BoxItem) => {
        return (
          <li
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => dispatch(boxSelected({ boxId: box.boxId }))}
            style={{
              backgroundColor: `rgb(${box.red}, ${box.green}, ${box.blue} )`,
            }}
            className={boxActive == box.boxNumber ? 'active' : ''}
            id={box.boxId}
            key={box.boxId}
          ></li>
        );
      })}
    </article>
  );
}

export default BoxList;
