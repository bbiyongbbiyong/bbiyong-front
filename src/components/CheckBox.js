import { useState } from 'react';
import "../css/message.css";
import MsgBox from './MsgBox.js';

export default function CheckBox() {
  const title = [ 
    {id: 0, name: '재난문자', path: 'emerMsg'},
    {id: 1, name: '지하철정보', path: 'twitter'},
    {id: 2, name: '도로통제정보', path: 'accident'},
  ];

  const [checkItems, setCheckItems] = useState([0, 1, 2]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if(checked) {
      const idArray = [];
      title.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    }
    else {
      setCheckItems([]);
    }
  }

  return (
    <div className="mainContainer">
      <input
        type='checkbox'
        onChange={(e) => handleAllCheck(e.target.checked)}
        checked={checkItems.length === title.length ? true : false} 
      />전체

      {title?.map((title, key) => (
        <span key={key}>
          <input
            type='checkbox'
            onChange={(e) => handleSingleCheck(e.target.checked, title.id)}
            checked={checkItems.includes(title.id) ? true : false} 
            />{title.name}
        </span>
        ))}

      <MsgBox check={checkItems} title={title}/>
    </div>
    
  )
}