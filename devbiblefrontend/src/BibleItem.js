import React from 'react';

const BibleItem = ({name, completed}) => (
    <li
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}>
        {name}
    </li>
);
   
export default BibleItem;
    