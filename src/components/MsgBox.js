/* eslint-disable */
import MsgContent from "./MsgContent";
import "../css/message.css";

function MsgBox({check, title}) {
  check.sort();
  return (
    <div className="msg-container">
      {
        (check.length === 0) ? <div className="check-none">체크박스를 선택해주세요!</div> :
        check.map((checkItem, i) => {
          return <MsgContent key={i} title={title[checkItem]} checkCount={check.length}/>
        })
      }
    </div>
  )
}

export default MsgBox;