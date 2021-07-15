import React, { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdCheckBoxOutlineBlank, MdCheckBox, MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import styles from './menu.module.css';
import ReactMarkdown from 'react-markdown';

const LayerItemCheckbox = ({ category, toggle, name, checked, hasModal, info }) => {
	const [isActive, setIsActive] = useState(checked);
	const [showInfo, setShowInfo] = useState(false);

	useEffect(() => toggle(isActive), [category, name, isActive, toggle])

	return (
		<>
			<Modal show={showInfo} onHide={() => setShowInfo(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title><b>{name}</b></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ReactMarkdown className={styles.infoDescription}>{info}</ReactMarkdown>
				</Modal.Body>
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
					<Modal.Title><b>{value}</b></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ReactMarkdown className={styles.infoDescription}>{info}</ReactMarkdown>
				</Modal.Body>
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
				{	< props.icon className={styles.icon} /> }
				<div className={styles.itemTitle}>{props.title}</div>
				<div style={{ lineHeight: '30px' }}>{isActive ? '-' : '+'}</div>
			</div>
			<div className={ isActive ? "" : "d-none"}>
				{props.children}
			</div>
		</div>
	);
}

const RadioGroup = ({ setter, default_val, items }) => {
	const [value, setValue] = useState(default_val);
	useEffect(() => setter(value), [value, setter]);

	return (
		<>
			{
				items.map((item, i) => 
					<LayerItemRadio value={item.display_name} key={i} 
						onSelect={() => setValue(item.value)} checked={value === item.value} hasModal={item.info !== undefined} info={item.info} />
				)
			}
		</>
	)
}

const Menu = ({ setters, config }) => {
	return (
		<div className={styles.container}>
			{
				config.map((section) =>
					<MenuItem title={section.display_name} icon={section.icon}>
						{
							(section.type === "multiple-select") ?
								section.items.map((item) => 
									<LayerItemCheckbox name={item.display_name} toggle={(value) => setters[item.key](value, item.item_name)}
										checked={item.default} info={item.info} hasModal={item.info !== undefined} />)

								: <RadioGroup default_val={section.default} setter={setters[section.key]} items={section.items}/>
						}
					</MenuItem>
				)
			}
		</div>
	);
}
export default Menu;
