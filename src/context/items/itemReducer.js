import {
    GET_ITEMS,
    CURRENT_ITEM,
  } from "../../types";
  // cuando se detecta el FORMULARIO_PROYECTO igual al de context se ejecuta el reducer
  export default (state, action) => {
    switch (action.type) {
  
      case GET_ITEMS:
        return {
          ...state,
          items: action.payload
        };

      case CURRENT_ITEM:
        return {
          ...state,
          item: state.items.filter(
            item => item._id === action.payload
          )
        };
      
      default:
        return state;
    }
  };
  