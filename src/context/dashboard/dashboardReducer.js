import { SHOW_DASHBOARD, 
    HIDE_DASHBOARD } from '../../types';
    
    
    export default (state, action) => {
        switch(action.type){
            case SHOW_DASHBOARD:
                return {
                    ...state,
                    dashboard: 'showing'
                }
            case HIDE_DASHBOARD:
                return {
                    dashboard: null
                }
            default:
                return state;
        }
    }