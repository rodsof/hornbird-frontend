import React, { useContext, useEffect } from 'react';
import itemContext from '../../context/items/itemContext';
import Item from './Item';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";
import ChartList from "../charts/ChartsList"

const ItemsList = ({ai}) => {

  // extraer proyectos de state inicial
  const itemsContext = useContext(itemContext);
  const { items, getItems, currentItem } = itemsContext;

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);


  return (

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
                    ai = {ai}
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

// 0: {_id: "5e6ad72e3cba6e0538dd635e", name: "FDD Alarms", href: "#"}
// 1: {_id: "5eb186a292a46a2d7c741025", name: "Energy Optimization", href: "energy-optimization"}
// 2: {_id: "5e597ae0f1acc234600c2ed5", name: "Energy", href: "#"}
// 3: {_id: "5eb16afa92a46a2d7c741024", name: "Anomaly Prediction", href: "anomaly-prediction"}
// 4: {_id: "5e6ad7203cba6e0538dd635d", name: "AHU", href: "#"}