import React, { useReducer } from 'react';
import AlarmContext from './alarmContext';
import AlarmReducer from './alarmReducer';
import clienteAxios from '../../config/axios';
import { CREATE_ALARM, GET_ALARMS } from '../../types';

const AlarmState = props => {
    const initialState = {
        alarms: []
    }

    const [ state, dispatch ] = useReducer(AlarmReducer, initialState);

    const createAlarm= async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/alarms/addAlarms',datos);
        } catch (error) {
            console.log(error);
        }        
    }

    const getAlarms = async () => {
        try {
            const respuesta = await clienteAxios.get('/api/alarms');
           dispatch({
               type: GET_ALARMS,
               payload: respuesta.data.alarms
           });
    
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <AlarmContext.Provider
        value={{
            alarms: state.alarms,
            createAlarm,
            getAlarms
        }}
        >
            {props.children}
        </AlarmContext.Provider>
    )
}

export default AlarmState;