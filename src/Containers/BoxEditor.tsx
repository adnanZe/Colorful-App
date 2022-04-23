import React from 'react';
import Button from '../Components/Button';
import { Input } from '../Components/Input';

function BoxEditor(): JSX.Element {
  return (
    <section className="box-editor">
      <h3>Box Editor</h3>
      <form action="">
        <Input color={'red'} colorId={'redEditor'} />
        <Input color={'green'} colorId={'greenEditor'} />
        <Input color={'blue'} colorId={'blueEditor'} />
        <Button classNames={['info']} innerText={'Info'} type={'button'} />
        <div className="selected-color">Box selected</div>
        <Button
          classNames={['apply-color']}
          innerText={'Apply color'}
          type={'submit'}
        />
      </form>
    </section>
  );
}

export default BoxEditor;
