import { GET_ALARMS, 
   CREATE_ALARM } from '../../types';
    
    
    export default (state, action) => {
        switch(action.type){
            case GET_ALARMS:
                return {
                    ...state,
                    alarms: action.payload
                }

            default:
                return state;
        }
    }