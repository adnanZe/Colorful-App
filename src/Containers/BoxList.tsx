import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boxSelected } from '../Store/Actions';
import { BoxItem } from '../Store/Reducers';
import store from '../Store/Store';

function BoxList(): JSX.Element {
  const boxItem = useSelector(store.getState);
  const dispatch = useDispatch();

  return (
    <section className="box-list">
      <h3>Box List</h3>
      {boxItem.boxList.map((box: BoxItem) => {
        return (
          <div
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => dispatch(boxSelected({ boxId: box.boxId }))}
            style={{
              backgroundColor: `rgb(${box.red}, ${box.green}, ${box.blue} )`,
            }}
            id={box.boxId}
            key={box.boxId}
          ></div>
        );
      })}
    </section>
  );
}

export default BoxList;
