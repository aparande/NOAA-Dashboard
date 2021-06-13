import styles from "./legend.module.css";

export const LegendContainer = ({children, height, className}) => {
  return (
    <div className={`${styles.container} d-flex ${className}`} style={{ height: height }} >
      {children}
    </div>
  )
}

export const Legend = ({ colors, stops }) => {
  let color_str = "";
  for (let i = 0; i < colors.length; i++) {
    color_str += `, ${colors[i]} ${stops[i]}%`;
  }
  const gradient = `linear-gradient(0deg${color_str})`;

  return (
    <div className="d-flex mr-5">
      <div className={styles.gradientLayer} style={{ backgroundImage: gradient }} />
      <div className="flex-column">
        {
          [...stops].reverse().map((stop) => {
            const positionClass = `n${stop - 3.5}`;
            return ( 
              <div style={{ position: "absolute", top: `${100 - stop}%` }}>
                <span className={`${styles.tick} ${styles[positionClass]}`}>--
                  <p className={`${styles.num} ${styles[positionClass]}`}>{(stop - 3.5) / 100}</p>
                </span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}