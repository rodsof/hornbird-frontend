import React,{ useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {    
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    OBTENER_USUARIOS,
    LOGIN_ERROR,
    AGREGAR_USUARIO,
    DELETE_MEMBER,
    LOGIN_EXITOSO,
    CERRAR_SESION } from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        usuarios:[],
        mensaje: null,
        cargando:true
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    // las funciones
    
            // funcion que devuelve el usuario autenticado
            const usuarioAutenticado = async () => {
                const token = localStorage.getItem('token');
                if(token) {
                    tokenAuth(token);
                }
        
                try {
                    const respuesta = await clienteAxios.get('/api/auth');
                    //console.log(respuesta);
                    dispatch({
                        type: OBTENER_USUARIO,
                        payload: respuesta.data.usuario
                    });
        
                } catch (error) {
                    console.log(error.response);
                    dispatch({
                        type: LOGIN_ERROR
                    })
                }
            }

            const registrarUsuario = async datos => {
                try {
                    const respuesta = await clienteAxios.post('/api/usuarios',datos);
        
                    dispatch({
                        type: REGISTRO_EXITOSO,
                        payload: respuesta.data
                        
                    });
        
                    // obtener el usuario
                    usuarioAutenticado();
                } catch (error) {
                    const alerta = {
                        msg: error.response.data.msg,
                        categoria: 'alerta-error'
                    }
                    dispatch({
                        type: REGISTRO_ERROR,
                        payload: alerta
                    })
                }        
            }
            const agregarUsuario = async datos => {
                try {
                    const respuesta = await clienteAxios.post('/api/usuarios',datos);
                    console.log(datos);
                    dispatch({
                        type: AGREGAR_USUARIO,
                        payload: datos 
                    });
                } catch (error) {
                    console.log(error);
                }        
            }
const getUsers = async () => {
    const token = localStorage.getItem('token');
    if (token){
        // funcion para enviar el token por headers
        tokenAuth(token);
    }
    try {
        const respuesta = await clienteAxios.get('/api/usuarios');
       dispatch({
           type: OBTENER_USUARIOS,
           payload: respuesta.data.users
       });

    } catch (error) {
        console.log(error.response);
    }
}

// delete memmber
const deleteMember = async id => {
    try {
        await clienteAxios.delete(`/api/usuarios/${id}`);
        dispatch({
            type: DELETE_MEMBER,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}

// cuando el usuario inicia sesion
 // Cuando el usuario inicia sesión
 const iniciarSesion = async datos => {
    try {
        const respuesta = await clienteAxios.post('/api/auth', datos);
        
        dispatch({
            type: LOGIN_EXITOSO,
            payload: respuesta.data
        });

        // Obtener el usuario
        usuarioAutenticado();
    } catch (error) {
        console.log(error.response.data.msg);
        const alerta = {
            msg: error.response.data.msg,
            categoria: 'alerta-error'
        }

        dispatch({
            type: LOGIN_ERROR,
            payload: alerta
        })
    }
}
 // Cierra la sesión del usuario
 const cerrarSesion = () => {
    dispatch({
        type: CERRAR_SESION
    })
}
    return(
        <AuthContext.Provider
        value = {{
            token: state.token,
            autenticado: state.usuario,
            usuario: state.usuario,
            usuarios: state.usuarios,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            agregarUsuario,
            usuarioAutenticado,
            getUsers,
            deleteMember,
            iniciarSesion,
            cerrarSesion
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;