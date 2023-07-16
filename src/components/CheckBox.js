import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import MsgBox from './MsgBox.js';
import SeoulMain from './SeoulMain.js';
import '../css/message.css';

export default function CheckBox() {
  const currentCity = useSelector((state) => state.city);
  const titles = [
    { id: 0, name: '재난문자', path: 'emerMsg' },
    { id: 1, name: '지하철정보', path: 'metro' },
    { id: 2, name: '도로통제정보', path: 'accident' },
  ];

  const [checkItems, setCheckItems] = useState([0, 1, 2]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      titles.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <div className="main-container">
      {currentCity.cityID < 2 ? (
        <SeoulMain />
      ) : (
        <>
          <div className="check-box">
            <div id="check-box-container">
              <input
                type="checkbox"
                id="total"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === titles.length}
              />
              <label htmlFor="total" className="checkbox-name">
                전체
              </label>

              {titles.map((title, key) => (
                <span key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    onChange={(e) => handleSingleCheck(e.target.checked, title.id)}
                    checked={!!checkItems.includes(title.id)}
                  />
                  <label htmlFor={key} className="checkbox-name">
                    {title.name}
                  </label>
                </span>
              ))}
            </div>
          </div>
          <MsgBox check={checkItems} title={titles} />
        </>
      )}
    </div>
  );
}
