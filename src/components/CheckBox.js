import { useState } from 'react';
import "../css/message.css";

export default function CheckBox() {
  const data = [
    {id: 0, title: '지하철정보'},
    {id: 1, title: '도로통제정보'},
    {id: 2, title: '재난문자'},
  ];


  const [checkItems, setCheckItems] = useState([]);

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
    <div>
            <input type='checkbox'  name='select-all'
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={checkItems.length === data.length ? true : false} />전체
        {data?.map((data, key) => (
          <span key={key}>
              <input type='checkbox' name={`select-${data.id}`}
                onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                checked={checkItems.includes(data.id) ? true : false} />{data.title}
          </span>
        ))}
    </div>
  )
}
