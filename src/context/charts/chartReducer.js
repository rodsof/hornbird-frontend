import { 
    CHARTS_ITEM, 
    CURRENT_CHART,
    GET_DATASET,
    MACHINE_CONDITION,
    GRAPH_API
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
      case MACHINE_CONDITION:{
        return{
          ...state,
          machineConditionData:action.payload
        }
      }
      case GRAPH_API:{
        return{
          ...state,
          graphApiData:action.payload
        }
      }
    default:
      return state;
  }
};
