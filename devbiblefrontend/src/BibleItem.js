import React from 'react';

const BibleItem = ({name, completed, onDelete}) => (
    <li
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
        {name}
        <span onClick={onDelete}> X </span>
    </li>
);
   
export default BibleItem;
    