import React,{ useContext } from 'react';
import itemContext from '../../context/items/itemContext';
import chartContext from '../../context/charts/chartContext';
const Item = ({item}) => {

     // Obtener el state del formulario
  const itemsContext = useContext(itemContext);
  const { currentItem } = itemsContext;

  // obtener la funcion del context de tarea
  const chartsContext = useContext(chartContext);
    const { getCharts } = chartsContext;
    
  // funcion para cargar item actual
  const selectItem = id => {
        currentItem(id); // fijar un item actual
        getCharts(id); // filtrar las tareas segun item
  }
    return ( 
      <li className="sub-menu">
      <a 
            className="btn btn-primario btn-block" 
            onClick = {()=> selectItem(item._id)}>
                {item.name}
            </a>
    </li>
      
     );
}
 
export default Item;