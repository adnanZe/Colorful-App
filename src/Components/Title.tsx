import React from 'react';

const TITTLE = 'Colors editor';
// const MOTTO_ONE = "Hey You!";
// const MOTTO_TWO = "Wish You Are Here";

function Title(): JSX.Element {
  return (
    <hgroup className="title" title={TITTLE}>
      <h1>{TITTLE}</h1>
      {/* <p>{MOTTO_ONE}</p> */}
      {/* <p>{MOTTO_TWO}</p> */}
    </hgroup>
  );
}

export default Title;
