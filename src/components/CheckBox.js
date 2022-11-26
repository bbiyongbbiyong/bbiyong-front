import { useState } from 'react';
import "../css/message.css";
import MsgBox from './MsgBox.js';

export default function CheckBox() {
  const data = [ // 없애는 방향으로 하는게 좋을 듯?
    {id: 0, title: '재난문자'},
    {id: 1, title: '지하철정보'},
    {id: 2, title: '도로통제정보'},
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
      data.forEach((el) => idArray.push(el.id));
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
        name='select-all'
        onChange={(e) => handleAllCheck(e.target.checked)}
        checked={checkItems.length === data.length ? true : false} 
      />전체

      {data?.map((data, key) => (
        <span key={key}>
          <input
            type='checkbox'
            name={`select-${data.id}`} // ???? data의 역할?
            onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
            checked={checkItems.includes(data.id) ? true : false} 
            />{data.title}
        </span>
        ))}

      <MsgBox checkItems={checkItems}/>
    </div>
    
  )
}