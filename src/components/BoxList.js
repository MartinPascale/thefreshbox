import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchBoxes from '../helpers/fetchBoxes';
import BoxCard from './BoxCard';

import '../styles/BoxList.scss';

const BoxList = ({ title, refProp }) => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.toJS().boxes);

  useEffect(() => {
    fetchBoxes(dispatch);
  }, []);

  return (
    <>
      <div className='list-title'>{title}</div>
      <div ref={refProp} className='list-container'>
        {list.map((box) => (
          <BoxCard box={box} />
        ))}
      </div>
    </>
  );
};

export default BoxList;
