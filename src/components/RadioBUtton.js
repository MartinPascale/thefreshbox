import React from 'react';
import classNames from 'classnames';
import '../styles/RadioButton.scss';

const RadioButton = ({ selected }) => {
  return (
    <div
      className={classNames('radio-button', {
        'radio-button--selected': selected,
      })}
    >
      {selected && <div className='radio-button__circle' />}
    </div>
  );
};

export default RadioButton;
