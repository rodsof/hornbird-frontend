import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const AddMember = props => { // props viene de react router dom
// extraer los valores del context
const alertaContext = useContext(AlertaContext);
const { alerta, mostrarAlerta } = alertaContext;

const authContext = useContext(AuthContext);
const { mensaje, registrarUsuario } = authContext;

//En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
useEffect(() => {
  if (mensaje) {
    mostrarAlerta(mensaje.msg, mensaje.categoria);
  }
  // eslint-disable-next-line
}, [mensaje]);

// State para iniciar sesión
const [usuario, guardarUsuario] = useState({
  name: "",
  email: "",
  password: "",
  confirm: ""
});

// extraer de usuario
const { name, email, password, confirm } = usuario;

const onChange = e => {
  guardarUsuario({
    ...usuario,
    [e.target.name]: e.target.value
  });
};
 
// Cuando el usuario quiere iniciar sesión
const onSubmit = e => {
  e.preventDefault();

  // Validar que no haya campos vacios
  if (
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    confirm.trim() === ""
  ) {
    mostrarAlerta("Please complete all fields", "alerta-error");
    return;
  }

  // Password minimo de 6 caracteres
  if (password.length < 6) {
    mostrarAlerta(
      "Password must be at least 6 characters long",
      "alerta-error"
    );
    return;
  }

  // Los 2 passwords son iguales
  if (password !== confirm) {
    mostrarAlerta("Los passwords no son iguales", "alerta-error");
    return;
  }

  // Pasarlo al action
  registrarUsuario({
    name,
    email,
    password
  });
};
 
return (
  <div className="row">
    {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}

        <h1> ADD MEMBER </h1>

        <form 
        onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={onChange}
/>
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={onChange}
/>
          </div>

          <div className="campo-form">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repeat Password"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Add Member"
              onChange={onChange}
            />
          </div>
        </form>
      </div>
  );
};

export default AddMember;