import { useParams } from 'react-router-dom';
import CheckBox from "./CheckBox";

function Main(){
    return (
        <div>
            <h2>지금 서울은?</h2>
          <div>
              <CheckBox />
          </div>
        </div>
      );
}
export default Main;



