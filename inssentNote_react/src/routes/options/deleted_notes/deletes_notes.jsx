import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios_credentials_head from "../../../config/axios_credentials_head";
import NoteCards from "./cards/cards";
import styles from "./deletes_notes.css";


const DeletesNotes = () => {
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
      setState(response.data);
    }, (err) => {
      alert(err);
    });
  },[]);
  const getAllNotes = () => {
    return state.map(x => {
      if (x.state === 'completed'){
        return(
          <NoteCards key={x.register} notes={x}/>
          );
      }
    })
  };
  return (
    <div className="row justify-content-center">
      {
        getAllNotes()
      }
    </div>
  );
};
export default DeletesNotes;