import React, { useContext, useEffect } from 'react';
import itemContext from '../../context/items/itemContext';
import Item from './Item';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Link } from "react-router-dom";


const ItemsList = () => {

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
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <li>
            </li>
            <li>
                <a className="btn btn-primario btn-block" >
                    AI OPTIMIZATION
                </a>
                <ul>
                    <Link to={"/fault-prediction"} className="link btn btn-primario btn-block ">

                        <li>Fault Prediction</li>
                    </Link>
                    <Link to={"/energy-optimization"} className="link btn btn-primario btn-block " >

                        <li>Energy Optimization</li>
                    </Link>
                </ul>
            </li>
        </ul>
    );
}

export default ItemsList;