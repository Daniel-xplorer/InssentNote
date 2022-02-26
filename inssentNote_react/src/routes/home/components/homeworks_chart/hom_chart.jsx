import { Link } from 'react-router-dom';
import style from './hom_chart.css';

const NoteCards = (props) => {
  console.log('chart', props)

  return (
    <div className="m-0 vh-100 row justify-content-center aling-items-center">
      <div className=" card w-75 h-20 " id={style.card}>
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <Link to={`/edit_note/${props.note.register}`} className="btn btn-primary">Get Into</Link>
          <footer className="blockquote-footer">{props.note.createdDate}</footer>
        </div>
      </div>
    </div>
  )
};
export default NoteCards