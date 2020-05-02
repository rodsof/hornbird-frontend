import React, { useReducer } from 'react';
import dashboardReducer from './dashboardReducer';
import dashboardContext from './dashboardContext';

import { SHOW_DASHBOARD, HIDE_DASHBOARD } from '../../types';

const DashboardState = props => {
    const initialState = {
        dashboard: 'showing'
    }

     const [ state, dispatch ] = useReducer(dashboardReducer, initialState);

    const showDashboard = () => {
        dispatch({
            type: SHOW_DASHBOARD
        })
    }
    
    const hideDashboard = () => {
        dispatch({
            type: HIDE_DASHBOARD
        })
    }
    return (
        <dashboardContext.Provider
        value={{
            dashboard: state.dashboard,
            showDashboard,
            hideDashboard
        }}
        >
            {props.children}
        </dashboardContext.Provider>
    )
}

export default DashboardState;