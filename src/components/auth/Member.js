import React,{ useContext } from 'react';
import authContext from "../../context/autenticacion/authContext";

const Member = ( {usuario} ) => {

    const AuthContext = useContext(authContext);
    const { getUsers } = AuthContext;

const deleteMember = id => {
        deleteMember(id);
        getUsers();
  }

return (
    <li className="tarea sombra">
    <p> {usuario.name} </p>
    <div className="acciones">
        <button 
        type="button"
         className="btn btn-secundario"
         onClick= {()=> deleteMember(usuario._id)} >
          Eliminar
        </button>
      </div>
    </li>
);
}
export default Member;