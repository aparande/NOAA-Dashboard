export const LegendContainer = (props) => {
  return (
    <div className="legend-container" style={{
      position: "fixed",
      left: "10px",
      height: "50vh",
      zIndex: 400,
      top: "25vh",
      display: "flex"
    }} >
      { props.children }
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
    <div style={{display: "flex", marginRight: "3em"}}>
      <div className="legend" style={{
        width: "20px",
        height: "100%",
        marginRight: "10px",
        backgroundImage: gradient
      }} />
      <div style={{ display:"flex-column" }}>
        { [...stops].reverse().map((stop) => <div className="nums" style={{ position: "absolute", top: `${100 - stop }%`}}> <span>{stop / 100}</span> </div> ) }
      </div>
    </div>
  )
}
