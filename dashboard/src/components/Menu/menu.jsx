import React, { useEffect, useState } from 'react';
import {GiPositionMarker, GiWhaleTail} from 'react-icons/gi';
import {VscPerson} from 'react-icons/vsc';
import {TiTree} from 'react-icons/ti';
import {MdCheckBoxOutlineBlank, MdCheckBox, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { SPECIES_HABITAT_KEYS, SPECIES_DETECTION_KEYS } from '../..//constants';

import './menu.css';

const icons = {
    Buoys: <GiPositionMarker className="menu-icon"/>,
    Anthropogenic: <VscPerson className="menu-icon"/>,
    Detections: <GiWhaleTail className="menu-icon"/>,
    Habitats: <TiTree className="menu-icon"/>
  };

const LayerItemCheckbox = ({ category, toggle, name, checked }) => {
    const [isActive, setIsActive] = useState(checked);

    useEffect(() => toggle(isActive), [ category, name, isActive, toggle ])

    return(
        <div className="menu-item-clickable" onClick={() => setIsActive(!isActive)}>
            <div className="menu-item-title">{name}</div>
            <div className="menu-item-input">{isActive ?  <MdCheckBox />:<MdCheckBoxOutlineBlank />}</div>
        </div>
    )
}
const LayerItemRadio = ({ value, onSelect, checked }) => {
    return(
        <div className="menu-item-clickable" onClick={() => onSelect(value)}>
            <div className="menu-item-title">{value}</div>
            <div className="menu-item-input">{checked ?  <MdRadioButtonChecked />:<MdRadioButtonUnchecked />}</div>
        </div>
    )
}

// TODO: Make RadioMenuItem and MenuItem the same
const RadioMenuItem = ({ title, onChange, values, defaultValue }) => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(null);

    useEffect(() => onChange(value), [value, onChange]);
    useEffect(() => { if (value === null || value === undefined) setValue(defaultValue) }, [ defaultValue, value ] );

    return (
        <div className="menu-item">
            <div className="menu-title" onClick={() => setIsActive(!isActive)} >
                {icons[title]}
                <div className="menu-item-header">{title}</div>
                <div style={{lineHeight: '30px'}}>{isActive ? '-' : '+'}</div>
            </div>
            {isActive &&
                <div className="menu-item-content">
                    { values.map((val, i) => <LayerItemRadio value={val} key={i} onSelect={() => setValue(val) } checked={value === val}/>) }
                </div>
            }
        </div>
    )
}

const MenuItem = (props) => {
    const [isActive, setIsActive] = useState(false);

    return(
        <div className="menu-item">
            <div className="menu-title" onClick={() => setIsActive(!isActive)} >
                {icons[props.title]}
                <div className="menu-item-title">{props.title}</div>
                <div style={{lineHeight: '30px'}}>{isActive ? '-' : '+'}</div>
            </div>
            {isActive &&
                <div className="menu-item-content">
                    {props.children}
                </div>
            }
        </div>
    );
}

const Menu = (props) => {
    return(
        <div className="menu">
            <MenuItem title="Buoys" toggle={props.layers}>
                <LayerItemCheckbox name="Buoy Path" toggle={(value) => props.layers("Buoys", "BuoyPath", value)} checked={true}/>
            </MenuItem>
            <MenuItem title="Anthropogenic" toggle={props.layers}>
                <LayerItemCheckbox name="Oil Rigs" toggle={(value) => props.layers("Development", "OilRigs", value)} checked={false}/>
                <LayerItemCheckbox name="Shipping Routes" toggle={(value) => props.layers("Development", "ShippingRoutes", value)} checked={false}/>
            </MenuItem>
            <MenuItem title="Detections" toggle={props.layers}>
                {
                    Object.keys(SPECIES_DETECTION_KEYS).map((key, idx) =>
                        <LayerItemCheckbox name={SPECIES_DETECTION_KEYS[key]} toggle={(value) => props.layers("Detections", key, value)} checked={false} key={idx}/>
                    )
                }
            </MenuItem>
            <RadioMenuItem title="Habitats" onChange={(value) => props.layers("Habitats", "selectedHabitat", value)}
                           values={ ["None", ...SPECIES_HABITAT_KEYS] } defaultValue="None"/>
        </div>
    );
}
export default Menu;