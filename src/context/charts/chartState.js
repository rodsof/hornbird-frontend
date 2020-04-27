import React, { useReducer } from 'react';
import chartContext from './chartContext';
import ChartReducer from './chartReducer';
import clienteAxios from '../../config/axios';
import axios from "axios"
import {
    CHARTS_ITEM,
    GET_DATASET,
    MACHINE_CONDITION,
    GRAPH_API
} from '../../types';
const ChartState = props => {
    const initialState = {
        chartsitem: [],
        dataset: [],
        chartselected: null,
        machineConditionData: null,
        graphApiData: null,
    }

    // create dispatch and state
    const [state, dispatch] = useReducer(ChartReducer, initialState);

    // get charts for an item
    const getCharts = async item => {
        try {
            const result = await clienteAxios.get('/api/charts', { params: { item } });
            dispatch({
                type: CHARTS_ITEM,
                payload: result.data.charts
            })
        } catch (error) {
            console.log('error');
        }
    }


    const getMachineCondition = async () => {
        try {
            let arr = []
            let result = await axios.get('https://facialrecognition-1.herokuapp.com/api/machineCondition');
            result = JSON.parse(result.data)
            // console.log("result===>", result)

            result.data.map((val, inx) => {

                let date = new Date(result.index[inx])
                date = date.toJSON().split("T")[0]
                // console.log("val===>", val[1])
                arr.push({
                    label: date,
                    value: val[0],
                    threshold:val[1]
                })
            })
            
            console.log("state of arr=-===>", arr)
            dispatch({
                type: MACHINE_CONDITION,
                payload: arr
            })
        } catch (error) {
            console.log('error', error);
        }
    }

    const getGraphApi = async () => {
        try {
            const result = await axios.get('https://facialrecognition-1.herokuapp.com/api/graphs');
            // console.log("result", result)
            dispatch({
                type: GRAPH_API,
                payload: result.data
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
            value={{
                chartsitem: state.chartsitem,
                chartselected: state.chartselected,
                dataset: state.dataset,
                machineConditionData: state.machineConditionData,
                graphApiData: state.graphApiData,
                getCharts,
                getDataset,
                getMachineCondition,
                getGraphApi
            }}
        >
            {props.children}
        </chartContext.Provider>
    )
}

export default ChartState;