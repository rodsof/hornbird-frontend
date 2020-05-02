import React, { Fragment, useContext, useEffect} from "react";
import authContext from "../../context/autenticacion/authContext";
import Member from "./Member";
import { CSSTransition, TransitionGroup} from 'react-transition-group';

const MembersList = ({id}) => {
   // obtener las tareas del proyecto
   const AuthContext = useContext(authContext);
   const { usuarios, getUsers } = AuthContext;

    useEffect(() => {
    getUsers();
    // eslint-disable-next-line
}, []); 
 
  return (
    <Fragment>
      <h2 className="itemName"> Members </h2>
      <ul className="listado-tareas">
        <TransitionGroup> 
          {usuarios.map(usuario => 
          <CSSTransition
          key={usuario._id} // el key se mueve hasta aca pq es el primer hijo de la iteracion
          timeout={200}
         >
            <Member
            usuario={usuario} 
            currentId = {id}
            /> 
          </CSSTransition>
            )}
        </TransitionGroup>
      </ul>
      
    </Fragment>
  );
};

export default MembersList;
