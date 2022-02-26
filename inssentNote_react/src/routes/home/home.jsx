import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getData } from "../../actions/users";
import axios_credentials_head from "../../config/axios_credentials_head";
import Dater from "./components/dater/dater";
import NoteCards from "./components/homeworks_chart/hom_chart";



const Home = (props) => {
    const [notes, setNotes] = useState([]);
    const Axios = axios_credentials_head()
    useEffect(()=> {
        const userID = localStorage.getItem('userID');
        let date = new Date().toISOString();
        const userData = {
            id: userID,
            info: ['first_name', 'last_name']
        };
        const notesData = {
            userId: userID,
            dateLimit: date.split('T')[0]
        };
        props.getData(userData);//propiedad 
        Axios.get(`http://localhost:3000/notes/get_notes`, {params:notesData})
        .then(response => {
            if (response.data.msg === 'Dont Have Notes Yet.') {//aqui habrá un error
                alert('Dont Have Notes Yet.');
            } else {
                setNotes(response.data);
            };
        })
        .catch(err => {
            throw new TypeError(err);
        });
    },[])
    const allNotesToday = () => {
        console.log('actual', notes)
        if (notes.length > 1) {
            return notes.map(x => {
                return <NoteCards note={x}/> 
            });
        } else {
            return <NoteCards note={notes}/>
        };
    };
    return (
        <div>
            <h2>
                Bienvenido {props.userData.first_name} {props.userData.last_name}
            </h2>
            { allNotesToday() }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userLoged: state.users.userLoged,
        userData: state.users.userData
    };
};

export default connect(mapStateToProps, { getData })(Home);