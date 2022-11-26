/* eslint-disable */
import MsgContent from "./MsgContent";
import "../css/message.css";

function MsgBox(props) {
  let check = props.checkItems;

  return (
    <div>
      {
        check.map((a, i) => {
          return <MsgContent check={check[i]}/>
        })
      }
    </div>
  )
}

export default MsgBox;