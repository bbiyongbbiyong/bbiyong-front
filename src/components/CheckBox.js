import { useState } from 'react';
import { useSelector } from "react-redux";
import SeoulMain from "./SeoulMain.js";
import MsgBox from './MsgBox.js';
import "../css/message.css";

export default function CheckBox() {
  let state = useSelector((state) => { return state; });
	let clickCity = state.clickCity;

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
    <div className="main-container">
      {clickCity.cityID < 2 ? (
        <SeoulMain />
      ) : (
        <>
          <div className="check-box">
            <input
              type="checkbox"
              id="total"
              onChange={(e) => handleAllCheck(e.target.checked)}
              checked={checkItems.length === title.length ? true : false}
            />
            <label for="total">전체</label>

            {title?.map((title, key) => (
              <span key={key}>
                <input
                  type="checkbox"
                  id={key}
                  onChange={(e) =>
                    handleSingleCheck(e.target.checked, title.id)
                  }
                  checked={checkItems.includes(title.id) ? true : false}
                />
                <label for={key}>{title.name}</label>
              </span>
            ))}
          </div>
          <MsgBox check={checkItems} title={title} />
        </>
      )}
    </div>
  );
}