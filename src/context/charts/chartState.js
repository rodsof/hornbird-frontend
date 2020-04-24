import React,{useReducer} from 'react';
import chartContext from './chartContext';
import ChartReducer from './chartReducer';
import clienteAxios from '../../config/axios';
import {
    CHARTS_ITEM,
    GET_DATASET
} from '../../types';
const ChartState = props => {
    const initialState = {
        chartsitem: [],
        dataset: [],
        chartselected: null
    }

    // create dispatch and state
    const [state, dispatch] = useReducer(ChartReducer, initialState);

    // get charts for an item
    const getCharts = async item => {
        try {
            const result = await clienteAxios.get('/api/charts',{ params: { item }});
            dispatch({
                type: CHARTS_ITEM,
                payload: result.data.charts
            })
        } catch (error) {
            console.log('error');
        }
    }
    
const getDataset = async () => {
    try {
        const result = await clienteAxios.get('/api/dataset');
        dispatch({
            type: GET_DATASET,
            payload: result.data.dataset
        })
    } catch (error) {
        console.log('error');
    }
}
    return (
        <chartContext.Provider
            value = {{
                chartsitem: state.chartsitem,
                chartselected: state.chartselected,
                dataset: state.dataset,
                getCharts,
                getDataset
                        }}
        >
            {props.children}
        </chartContext.Provider>
    )
}

export default ChartState;