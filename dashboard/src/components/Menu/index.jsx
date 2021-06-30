import React, { useEffect, useState } from 'react';
import {GiPositionMarker, GiWhaleTail} from 'react-icons/gi';
import {VscPerson} from 'react-icons/vsc';
import {TiTree} from 'react-icons/ti';
import {MdCheckBoxOutlineBlank, MdCheckBox, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { SPECIES_HABITAT_KEYS, SPECIES_DETECTION_KEYS } from '../../constants';

import styles from './menu.module.css';

const icons = {
    Buoys: <GiPositionMarker className={styles.icon}/>,
    Anthropogenic: <VscPerson className={styles.icon}/>,
    Detections: <GiWhaleTail className={styles.icon}/>,
    Habitats: <TiTree className={styles.icon}/>
  };

const LayerItemCheckbox = ({ category, toggle, name, checked }) => {
    const [isActive, setIsActive] = useState(checked);

    useEffect(() => toggle(isActive), [ category, name, isActive, toggle ])

    return(
        <div className={styles.itemClickable} onClick={() => setIsActive(!isActive)}>
            <div className={styles.itemHeader}>{name}</div>
            <div className={styles.itemInput}>{isActive ?  <MdCheckBox />:<MdCheckBoxOutlineBlank />}</div>
        </div>
    )
}
const LayerItemRadio = ({ value, onSelect, checked }) => {
    return(
        <div className={styles.itemClickable} onClick={() => onSelect(value)}>
            <div className={styles.itemHeader}>{value}</div>
            <div className={styles.itemInput}>{checked ?  <MdRadioButtonChecked />:<MdRadioButtonUnchecked />}</div>
        </div>
    )
}

const MenuItem = (props) => {
    const [isActive, setIsActive] = useState(false);

    return(
        <div className={styles.item}>
            <div className={styles.title} onClick={() => setIsActive(!isActive)} >
                {icons[props.title]}
                <div className={styles.itemTitle}>{props.title}</div>
                <div style={{lineHeight: '30px'}}>{isActive ? '-' : '+'}</div>
            </div>
            {isActive &&
                <div className={styles.itemContent}>
                    {props.children}
                </div>
            }
        </div>
    );
}

const Menu = ({ layers }) => {
    const [habitatValue, setHabitatValue] = useState("None");

    useEffect(() => layers("Habitats", "selectedHabitat", habitatValue), [ habitatValue, layers ]);

    return(
        <div className={styles.container}>
            <MenuItem title="Buoys">
                <LayerItemCheckbox name="Buoy Path" toggle={(value) => layers("Buoys", "BuoyPath", value)} checked={true}/>
            </MenuItem>
            <MenuItem title="Anthropogenic">
                <LayerItemCheckbox name="Oil Rigs" toggle={(value) => layers("Development", "OilRigs", value)} checked={false}/>
                <LayerItemCheckbox name="Shipping Routes" toggle={(value) => layers("Development", "ShippingRoutes", value)} checked={false}/>
            </MenuItem>
            <MenuItem title="Detections">
                {
                    Object.keys(SPECIES_DETECTION_KEYS).map((key, idx) =>
                        <LayerItemCheckbox name={SPECIES_DETECTION_KEYS[key]} toggle={(value) => layers("Detections", key, value)} checked={false} key={idx}/>
                    )
                }
            </MenuItem>
            <MenuItem title="Habitats">
                {
                    ["None", ...SPECIES_HABITAT_KEYS].map((val, i) => 
                        <LayerItemRadio value={val} key={i} onSelect={() => setHabitatValue(val) } checked={habitatValue === val}/>
                    )
                }
            </MenuItem>
        </div>
    );
}
export default Menu;
