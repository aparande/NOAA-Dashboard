import React, { useEffect, useState } from 'react';

import { GiPositionMarker, GiWhaleTail } from 'react-icons/gi';
import { VscPerson } from 'react-icons/vsc';
import { TiTree } from 'react-icons/ti';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';

import { Modal } from 'react-bootstrap';

import { SPECIES_HABITAT_KEYS, SPECIES_DETECTION_KEYS } from '../../constants';

import styles from './menu.module.css';

const icons = {
	Buoys: <GiPositionMarker className={styles.icon} />,
	Anthropogenic: <VscPerson className={styles.icon} />,
	Detections: <GiWhaleTail className={styles.icon} />,
	Habitats: <TiTree className={styles.icon} />
};

const LayerItemCheckbox = ({ category, toggle, name, checked, hasModal, info }) => {
	const [isActive, setIsActive] = useState(checked);
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => toggle(isActive), [category, name, isActive, toggle])

	return (
		<>
			<Modal show={showInfo} onHide={() => setShowInfo(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>{name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>{info}</Modal.Body>
				</Modal>
			<div className={`d-flex align-items-center ${styles.itemRow}`}>
				{hasModal &&
						<button className={styles.infoButton} onClick={() => setShowInfo(true)}>
							<AiOutlineInfoCircle className={`${styles.icon} ${styles.iconSmall}`} />
						</button>
					}
				<div className={styles.itemClickable} onClick={() => setIsActive(!isActive)}>
					<div className={styles.itemHeader}>{name}</div>
					<div className={styles.itemInput}>{isActive ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</div>
				</div>
			</div>
		</>
	)
}
const LayerItemRadio = ({ value, onSelect, checked, hasModal, info }) => {
	const [showInfo, setShowInfo] = useState(false);
	return (
		<>
			<Modal show={showInfo} onHide={() => setShowInfo(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>{value}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{info}</Modal.Body>
			</Modal>
			<div className={`d-flex align-items-center ${styles.itemRow}`}>
				{hasModal &&
					<button className={styles.infoButton} onClick={() => setShowInfo(true)}>
						<AiOutlineInfoCircle className={`${styles.icon} ${styles.iconSmall}`} />
					</button>
				}

				<div className={styles.itemClickable} onClick={() => onSelect(value)}>
					<div className={styles.itemHeader}>{value}</div>
					<div className={styles.itemInput}>{checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}</div>
				</div>
			</div>
		</>
	)
}

const MenuItem = (props) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className={styles.item}>
			<div className={styles.title} onClick={() => setIsActive(!isActive)} >
				{icons[props.title]}
				<div className={styles.itemTitle}>{props.title}</div>
				<div style={{ lineHeight: '30px' }}>{isActive ? '-' : '+'}</div>
			</div>
			{isActive &&
				<div>
					{props.children}
				</div>
			}
		</div>
	);
}

const Menu = ({ layers }) => {
	const [habitatValue, setHabitatValue] = useState("None");

	useEffect(() => layers("Habitats", "selectedHabitat", habitatValue), [habitatValue, layers]);

	return (
		<div className={styles.container}>
			<MenuItem title="Buoys">
				<LayerItemCheckbox name="Buoy Path" toggle={(value) => layers("Buoys", "BuoyPath", value)} checked={true} info="Blah Blah Info" hasModal/>
			</MenuItem>
			<MenuItem title="Anthropogenic">
				<LayerItemCheckbox name="Oil Rigs" toggle={(value) => layers("Development", "OilRigs", value)} checked={false} info="Blah Blah Info" hasModal/>
				<LayerItemCheckbox name="Shipping Routes" toggle={(value) => layers("Development", "ShippingRoutes", value)} checked={false} info="Blah Blah Info" hasModal/>
			</MenuItem>
			<MenuItem title="Detections">
				{
					Object.keys(SPECIES_DETECTION_KEYS).map((key, idx) =>
						<LayerItemCheckbox name={SPECIES_DETECTION_KEYS[key]} toggle={(value) => layers("Detections", key, value)} checked={false} key={idx} info="Blah Blah Info" hasModal />
					)
				}
			</MenuItem>
			<MenuItem title="Habitats">
				{
					["None", ...SPECIES_HABITAT_KEYS].map((val, i) =>
						<LayerItemRadio value={val} key={i} onSelect={() => setHabitatValue(val)} checked={habitatValue === val} hasModal={val !== "None"} info="Blah Blah Info" />
					)
				}
			</MenuItem>
		</div>
	);
}
export default Menu;
