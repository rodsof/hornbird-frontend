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