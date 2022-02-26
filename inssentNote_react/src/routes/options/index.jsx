import { Link } from "react-router-dom";


const Options = () => {
  return(
    <div>
      <ul>
        <li>
          <Link to='/options/deleted_notes'>Deleted notes</Link>
        </li>
      </ul>
    </div>
  )
};
export default Options;