import React, { useReducer } from "react";
import itemContext from "./itemContext";
import itemReducer from "./itemReducer";
import clienteAxios from '../../config/axios';
import axios from "axios"

import {
  GET_ITEMS,
  CURRENT_ITEM,
  GET_FAULT_TABLE,
  ENERGY_OPT_TABLE,
  SET_PARAMETERS
} from "../../types";

const ItemState = props => {
  const initialState = {
    items: [],
    item: null,
    faultTableData: null,
    energyTableData: null,
    setParams: null,
  };

  // dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(itemReducer, initialState);


  // obtener los proyectos
  const getItems = async () => {
    try {
      const result = await clienteAxios.get('/api/items');
      // 0: {_id: "5e6ad72e3cba6e0538dd635e", name: "FDD Alarms", href: "#"}
      // 1: {_id: "5eb186a292a46a2d7c741025", name: "Energy Optimization", href: "energy-optimization"}
      // 2: {_id: "5e597ae0f1acc234600c2ed5", name: "Energy", href: "#"}
      // 3: {_id: "5eb16afa92a46a2d7c741024", name: "Anomaly Prediction", href: "anomaly-prediction"}
      // 4: {_id: "5e6ad7203cba6e0538dd635d", name: "AHU", href: "#"}
      result.data.items[0].href = "#"
      result.data.items[1].href = "#"
      result.data.items[2].href = "#"
      result.data.items[3].href = "#"
      result.data.items[4].href = "#"

      let arr = []
      arr[0] = result.data.items[2]
      arr[1] = result.data.items[4]
      arr[2] = result.data.items[3]
      arr[3] = { _id: "5e597ae0f1acc234600c2ed911", name: "Artificial Intelligence", href: "#" }
      arr[5] = result.data.items[0]
      arr[4] = result.data.items[1]
      

      console.log("arr====>",arr)
      dispatch({
        type: GET_ITEMS,
        payload: arr
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getSelectedTable = async (data = "actuator") => {
    console.log("data", data)

    try {
      const result = await axios.get(`https://hvac-api.herokuapp.com/api/${data}`);
      console.log("result.data=====>", result.data)
      let arr = []
      for (var k in result.data) {
        arr.push({ name: k, condition: result.data[k].status, value: result.data[k].anamoly_value, lower: result.data[k].lower_value, upper: result.data[k].upper_value, date: result.data[k].date })
      }
      dispatch({
        type: GET_FAULT_TABLE,
        payload: arr
      })
    } catch (error) {
      console.log(error);
    }
  }


  const setParameters = async (name, lower, upper) => {
    console.log("name,lower,upper", name, lower, upper)
    let data = {
      name, lower, upper
    }

    try {
      const result = await axios.post(`https://hvac-api.herokuapp.com/api/setParameters`, data);
      console.log("result", result)
      if (result.data) {
        alert(result.data.msg)
      }
      dispatch({
        type: SET_PARAMETERS,
        payload: result.data
      })
    } catch (error) {
      console.log(error);
    }
  }



  const getEnergyOptimization = async (data = "actuator") => {
    console.log("data", data)

    try {
      const result = await axios.get(`https://hvac-api.herokuapp.com/api/Optimization`);
      console.log("result energytable===?", result.data)



      dispatch({
        type: ENERGY_OPT_TABLE,
        payload: result.data
      })
    } catch (error) {
      console.log(error);
    }
  }



  // Selecciona el proyecto que el usuario clickeo
  const currentItem = itemId => {
    console.log("currentItem===>", itemId)
    dispatch({
      type: CURRENT_ITEM,
      payload: itemId
    });
  };


  return (
    <itemContext.Provider
      value={{
        items: state.items,
        item: state.item,
        energyTableData: state.energyTableData,
        faultTableData: state.faultTableData,
        setParams: state.setParams,
        getItems,
        currentItem,
        getSelectedTable,
        getEnergyOptimization,
        setParameters,
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};
export default ItemState;
// todo el state debe estar centralizado en este archivo
// mas que nada lo que fluye entre distintos components
