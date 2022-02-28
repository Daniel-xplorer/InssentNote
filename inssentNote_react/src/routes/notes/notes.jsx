import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios_credentials_head from "../../config/axios_credentials_head";
import NoteCards from "./cardNote/cardNote";
import styles from "./notes.css";


const Notes = () => {
  const [state, setState] = useState([]);
  const Axios = axios_credentials_head();
  const userId = localStorage.getItem('userID');
  const Navigate = useNavigate();
  useEffect(() => {
    const notesData = {
      userId: userId
    }
    Axios.get(`http://localhost:3000/notes/get_all`,{ params: notesData })
    .then(response => {
      if (response.data.msg === 'Not Exist Registers.') return alert('Not Exist Notes Yet.');
      console.log(response.data)
      setState(response.data);
    }, (err) => {
      alert(err);
    });
  },[]);
  const getAllNotes = () => {
    return state.map(x => {
      if (x.state === 'incompleted'){
        return(
          <NoteCards key={x.register} notes={x}/>
          );
      }
    })
  };
  return (
    <div className="row justify-content-center">
      {state.length ? 'all notes' : 'not have notes'}
      <div className="container d-flex justify-content-end" id={styles.c}>
        <button type="button" className="btn btn-warning "
          onClick={x => Navigate("/note")}
        >New Note</button>
      </div>
      {
        getAllNotes()
      }
    </div>
  );
};
export default Notes;