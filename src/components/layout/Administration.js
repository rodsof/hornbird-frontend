import React,{useContext, useEffect} from "react";
import Bar from "../layout/Bar";
import AuthContext from "../../context/autenticacion/authContext";
import AddMember from "../auth/AddMember";
import MembersList from "../auth/MembersList.js";

const Administration = (props) => {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext; 


  return (
    <div className="row">
    <div className="col-md-12 nopadding">
    <Bar 
    />
    </div>
    { usuario.admin ? 
        <div className="col-md-3">
      <MembersList
      /> 
      </div> :
       <div className="col-md-3" >
        <h3> Manage your profile </h3>
        </div>
}
      <div className="col-md-9">
        <main>
        <li className="tarea sombra">
        <p>{ usuario.name }</p>
        { usuario.admin ? 
        <div className="acciones">
        <p> #Administrator </p>
        <AddMember />
        </div>
        :
        <p> #User </p>
        }
         </li>
        </main>
      </div>
      </div>
  );
};

export default Administration;