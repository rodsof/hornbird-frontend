import React, {useReducer } from "react";
import itemContext from "./itemContext";
import itemReducer from "./itemReducer";
import clienteAxios from '../../config/axios';

import {
  GET_ITEMS,
  CURRENT_ITEM
} from "../../types";

const ItemState = props => {
  const initialState = {
    items: [],
    item: null
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
        getItems,
        currentItem
    }}
    >
      {props.children}
    </itemContext.Provider>
  );
};
export default ItemState;
// todo el state debe estar centralizado en este archivo
// mas que nada lo que fluye entre distintos components
