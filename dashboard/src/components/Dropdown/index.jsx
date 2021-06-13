import React from 'react';
import styles from './dropdown.module.css'

const Dropdown = ({ className, options, onSelect }) => {
  return (
    <span className={`${styles.container} ${className || ""}`}>
      <select className={styles.select} onChange={(event) => onSelect(event.target.value)}>
        {Object.keys(options).map((key) => <option value={key}>{options[key]} </option>)}
      </select>
    </span>
  )
}

export default Dropdown