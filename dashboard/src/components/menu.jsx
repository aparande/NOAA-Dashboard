import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {GiBuoy, GiWhaleTail} from 'react-icons/gi';
import {RiShipFill} from 'react-icons/ri';
import {TiTree} from 'react-icons/ti';
import {MdCheckBoxOutlineBlank, MdCheckBox, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { useMap} from 'react-leaflet';

const icons = {
    Buoys: <GiBuoy className="icon"/>,
    Development: <RiShipFill className="icon"/>,
    Detections: <GiWhaleTail className="icon"/>,
    Habitats: <TiTree className="icon"/>
  };


const LayerItemCheckbox = (props) => {
    const [isActive, setIsActive] = useState(props.checked);
    return(
        <div className="layer" onClick={() => {
            props.toggle(props.category, props.name.replace(/\s/g, ''), !isActive);
            setIsActive(!isActive)}}>
            <p className="layer-header">{props.name}</p>
            <div className="layer-input">{isActive ?  <MdCheckBox />:<MdCheckBoxOutlineBlank />}</div>
        </div>
    )
}
const LayerItemRadio = (props) => {
    return(
        <div className="layer" onClick={() => props.setSelected(props.name)}>
            <p className="layer-header">{props.name}</p>
            <div className="layer-input">{props.checked ?  <MdRadioButtonChecked />:<MdRadioButtonUnchecked />}</div>
        </div>
    )
}

const content = {
    Buoys: ["Buoy Path"],
    Development: ["Oil Rigs"],
    Detections: [],
    Habitats: ["None", "Sea Lion"],
}

const MenuItem = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedHabitat, setSelectedHabitat] = useState("None");
    
    // handler used to change state
    const setSelected = (layer) => {
        setSelectedHabitat(layer);
        props.toggle("Habitats", "selectedHabitat", layer);
    };
    return(
        <div className="menu-item">
            <div
                className="menu-title"
                onClick={() => setIsActive(!isActive)}
                >
            {icons[props.title]}
            <p className="menu-item-header">{props.title}</p>
            <div style={{lineHeight: '30px'}}>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="menu-item-content">
                {props.title == "Habitats" ? content[props.title].map((e, i) => <LayerItemRadio name={e} category={props.title} key={i} setSelected={setSelected} checked={selectedHabitat == e}/>)
                : content[props.title].map((e, i) => <LayerItemCheckbox name={e} category={props.title} toggle={props.toggle} key={i} checked={true}/>)}
                </div>}
        </div>
    );
}

const Menu = (props) => {
    return(
        <div className="menu">
            <MenuItem title="Buoys" toggle={props.layers}></MenuItem>
            <MenuItem title="Development" toggle={props.layers}></MenuItem>
            <MenuItem title="Detections" toggle={props.layers}></MenuItem>
            <MenuItem title="Habitats" toggle={props.layers}></MenuItem>
        </div>
    );
}
export default Menu;