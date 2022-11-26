/* eslint-disable */
import MsgContent from "./MsgContent";
import "../css/message.css";

function MsgBox(props) {
  let check = props.checkItems;
  check.sort();
  return (
    <div>
      {
        check.map((i) => { 
          return <MsgContent key={i} check={check[i]}/> // key값 추가 및 a 없애기
        })
      }
    </div>
  )
}

export default MsgBox;