import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Bar from "../layout/Bar";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const SignIn = (props) => {
   // extraer los valores del context
   const alertaContext = useContext(AlertaContext);
   const { alerta, mostrarAlerta } = alertaContext;
 
   const authContext = useContext(AuthContext);
   const { mensaje, autenticado, iniciarSesion} = authContext; 

  
    //En caso de que el password o usuario no existe
   useEffect(() => {
     if (autenticado) {
      props.history.push("/dashboard");
    } 
     if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    } 
    // eslint-disable-next-line
  }, [autenticado, mensaje, props.history]); 
  
  //State para iniciar sesion
  /* const [usuario, guardarUsuario] = useState({
    email: "",
    password: ""
  }); */

  //extraer de usuario
  //const { email, password } = usuario;
  /* const onChange = e => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value // la copia de usuario es para q lo q este en el otro campo no se reescriba
    });
  }; */

  // cuando el usuario quiere iniciar sesion
  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
    // validar que no haya campos vacios
    if (email.trim() === '' || password.trim() === ''){
      mostrarAlerta('Please complete all fields','alerta-error');
    }

    //  pasarlo al action
    iniciarSesion({ email, password });
  };
  return (
    <div className="row">
  <div className="col-12">
  <Bar/>
  </div>
  <div className="col-12">
    <div className="form-usuario">
    {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1> SIGN IN </h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
            /*   value={email}
              onChange={onChange} */
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              /* value={password}
              onChange={onChange} */
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <button className="btn btn-primario btn-block">
        <Link to={"/register"} className="linkSignIn" >
          Create Account
        </Link>
        </button>
        <button className="btn btn-primario btn-block">
        <Link to={"/"} className="linkSignIn">
          Home
        </Link>
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SignIn;
