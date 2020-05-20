import React,{ useContext, Fragment } from 'react';
import itemContext from '../../context/items/itemContext';
import chartContext from '../../context/charts/chartContext';
const Item = ({item,ai}) => {

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
      <Fragment>
        { item.name !== "Artificial Intelligence" ? 
        <li className="sub-menu">
      <a 
            href="#"
            className="btn btn-primario btn-block" 
            onClick = {()=> selectItem(item._id)}>
                {item.name} 
            </a> 
            </li>
         : 
         <li className="active">
         <a className="btn btn-primario btn-block" href="/">
                       <i className="icon_house_alt"></i>
                       <span>Artificial Intelligence</span>
                   </a>
       </li> 
         }
</Fragment>
     );
}
 
export default Item;