import React, { useContext, useEffect } from 'react';
import itemContext from '../../context/items/itemContext';
import Item from './Item';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
import ChartList from "../charts/ChartsList"

const ItemsList = () => {

  // extraer proyectos de state inicial
  const itemsContext = useContext(itemContext);
  const { items, getItems, currentItem } = itemsContext;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);


  return (
// /////////////////////
    // <ul className="links">
    //   {/* <TransitionGroup>
    //     {items.map((item) => (
    //       <CSSTransition key={item._id} timeout={200} classNames="proyecto">
    //         <Item item={item} />
    //       </CSSTransition>
    //     ))}
    //   </TransitionGroup>
    //   <li></li> */}
    //    <li>
    //     <Link to={"/alarm"} className="link btn btn-primario btn-block ">
    //       FDD Alarms
    //     </Link>
    //   </li>
    //   <li>
    //     <Link to={"/energy"} className="link btn btn-primario btn-block ">
    //       Energy
    //     </Link>
    //   </li>
    //   <li>
    //     <Link to={"/ahu"} className="link btn btn-primario btn-block ">
    //       AHU
    //     </Link>
    //   </li>
    //   <li className="sub-menu">
    //     <a className="btn btn-primario btn-block">
    //       <div class="dropdownai">
    //         AI Intelligence
    //          <div class="dropdown-content">
    //           <a href="fault-prediction">Fault Predictions</a>
    //           <a href="energy-optimization">Energy Optimization</a>
    //         </div>
    //       </div>
    //     </a>
    //   </li> 
      
    //   {/* <li> */}
    //   {/* <a className="btn btn-primario btn-block">AI OPTIMIZATION</a> */}
    //   {/* <ul>
    //       <Link
    //         to={"/fault-prediction"}
    //         className="link btn btn-primario btn-block "
    //       >
    //         <li>Fault Prediction</li>
    //       </Link>
    //       <Link
    //         to={"/energy-optimization"}
    //         className="link btn btn-primario btn-block "
    //       >
    //         <li>Energy Optimization</li>
    //       </Link>
    //     </ul> */}

    //   {/* </li> */}
    // </ul>

/////////////////////////////
    <ul className="links">
           <TransitionGroup>
           {items.map(item => (
               <CSSTransition
               key={item._id}
               timeout={200}
               classNames="proyecto"
               >
                    <Item
                    item={item}
                />
               </CSSTransition>
            ))}
           </TransitionGroup>
           <li>
        </li> 
        

        </ul>
  );
}

export default ItemsList;