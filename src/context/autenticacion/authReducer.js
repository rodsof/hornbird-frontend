import {    
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    OBTENER_USUARIOS,
    DELETE_MEMBER,
    LOGIN_ERROR,
    AGREGAR_USUARIO,
    LOGIN_EXITOSO,
    CERRAR_SESION} from '../../types';
    
    
    export default (state, action) => {
        switch(action.type){
            case LOGIN_EXITOSO:
            case REGISTRO_EXITOSO:
                    localStorage.setItem('token',action.payload.token);
                    return {
                        ...state,
                        autenticado: true,
                        mensaje: null,
                        cargando: false
                    }
            case LOGIN_ERROR:
            case REGISTRO_ERROR:
                case CERRAR_SESION:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    usuario: null,
                    autenticado: null,
                    mensaje: action.payload, 
                    cargando: false
                }
            case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }
            case DELETE_MEMBER: 
        return {
            ...state, 
            usuarios: state.usuarios.filter(usuario => usuario.id !== action.payload)
        }
            case OBTENER_USUARIOS:
                return {
                    ...state,
                    usuarios: action.payload
                }
            case AGREGAR_USUARIO:
                return{
                    ...state,
                usuarios: [action.payload, ...state.usuarios],
                }
            default:
                return state;
        }
    }