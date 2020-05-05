import React,{useContext, useEffect} from "react";
import Bar from "../layout/Bar";
import AuthContext from "../../context/autenticacion/authContext";
import AddMember from "../auth/AddMember";
import MembersList from "../auth/MembersList.js";
import Dashboard from "../layout/Dashboard";

const Administration = () => {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext; 
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
}, [])
let name = ' ';
let admin = false;
let id = ' ';
if (usuario){
  admin = usuario.admin;
  name = usuario.name;
  id = usuario._id;
}
  return (
    <div className="row nopadding">
    <div className="col-md-12 nopadding">
    <Bar 
    />
    </div>
    <div className="col-md-3 nopadding">
      <Dashboard 
      /> 
      </div> 
    { admin ? 
        <div className="col-md-2 nopadding">
      <MembersList
      id = {id}
      /> 
      </div> :
       null
}
      <div className="col-md-7">
        <main>
        <li className="tarea sombra">
        <p>{ name } : { admin ? <span>Administrator</span> : null } </p>
        { admin ? 
        <div className="acciones">
        <AddMember />
        </div>
        :
        <p> User </p>
        }
         </li>
        </main>
      </div>
      </div>
  );
};

export default Administration;