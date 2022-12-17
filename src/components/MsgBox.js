/* eslint-disable */
import MsgContent from "./MsgContent";
import "../css/message.css";

function MsgBox({check, title}) {
  check.sort();
  return (
    <div className="msg-container">
      {
        check.map((check, i) => {
          return <MsgContent key={i} title={title[check]}/>
        })
      }
    </div>
  )
}

export default MsgBox;