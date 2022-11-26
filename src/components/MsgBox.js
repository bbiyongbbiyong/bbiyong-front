/* eslint-disable */
import MsgContent from "./MsgContent";
import "../css/message.css";

function MsgBox(props) {
  let check = props.checkItems;
  check.sort();
  return (
    <div>
      {
        check.map((check, i) => {
          return <MsgContent key={i} check={check}/>
        })
      }
    </div>
  )
}

export default MsgBox;