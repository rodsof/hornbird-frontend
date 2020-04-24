import { 
    CHARTS_ITEM, 
    CURRENT_CHART,
    GET_DATASET
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case CHARTS_ITEM:
      return {
        ...state,
        chartsitem: action.payload
      };
    
        case CURRENT_CHART: 
        return {
          ...state,
          chartselected: action.payload
        };
    case GET_DATASET:
      return {
        ...state,
        dataset: action.payload
      }
    default:
      return state;
  }
};
