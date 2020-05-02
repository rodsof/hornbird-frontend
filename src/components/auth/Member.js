import React,{ useContext } from 'react';
import authContext from "../../context/autenticacion/authContext";

const Member = ( {usuario,currentId} ) => {

    const AuthContext = useContext(authContext);
    const { getUsers, deleteMember } = AuthContext;

const memberDelete = id => {
        deleteMember(id);
        getUsers();
  }

if (usuario._id === currentId ){
  return null;
}
else {
return (
    <li className="tarea sombra">
    <p> {usuario.name} </p>
    <div className="acciones">
        <button 
        type="button"
         className="btn btn-secundario"
         onClick= {()=> memberDelete(usuario._id)} >
          Delete
        </button>
      </div>
    </li>
);
}
}
export default Member;