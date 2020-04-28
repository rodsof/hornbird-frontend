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
      dispatch({
        type: GET_ITEMS,
        payload: result.data.items
      })
    } catch (error) {
      console.log(error);
    }
  }


  const getSelectedTable = async (data = "actuator") => {
    console.log("data", data)

    try {
      const result = await axios.get(`https://facialrecognition-1.herokuapp.com/api/${data}`);
      console.log("result.data=====>", result.data)
      let arr=[]
      for (var k in result.data) {
        arr.push({ name: k,condition:result.data[k].status,value:result.data[k].anamoly_value,lower:result.data[k].lower_value,upper:result.data[k].upper_value,date:result.data[k].date })
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
      const result = await axios.post(`https://facialrecognition-1.herokuapp.com/api/setParameters`, data);
      console.log("result", result)
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
      const result = await axios.get(`https://facialrecognition-1.herokuapp.com/api/Optimization`);
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
