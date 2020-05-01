import {
  GET_ITEMS,
  CURRENT_ITEM,
  ENERGY_OPT_TABLE,
  GET_FAULT_TABLE,
  SET_PARAMETERS
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
    case ENERGY_OPT_TABLE:
      return {
        ...state,
        energyTableData: action.payload
      }
      
      case GET_FAULT_TABLE:
      return {
        ...state,
        faultTableData: action.payload
      }

      case SET_PARAMETERS:
        return {
          ...state,
          setParams: action.payload
        }

    default:
      return state;
  }
};




// import {
//   GET_ITEMS,
//   CURRENT_ITEM,
//   GET_FAULT_TABLE,
//   ENERGY_OPT_TABLE,
//   SET_PARAMETERS
// } from "../../types";

// // cuando se detecta el FORMULARIO_PROYECTO igual al de context se ejecuta el reducer
// export default (state, action) => {
//   switch (action.type) {

//     case GET_ITEMS:
//       return {
//         ...state,
//         items: action.payload
//       };

//     case CURRENT_ITEM:
//       return {
//         ...state,
//         item: state.items.filter(
//           item => item._id === action.payload
//         )
//       };

//     default:
//       return state;
//   }
// };
