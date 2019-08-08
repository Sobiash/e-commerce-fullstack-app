const styles = (x, selectedColor) => ({
  backgroundColor: x,
  margin: "3px",
  width: "20px",
  height: "20px",
  display: "inline-block",
  cursor: "pointer",
  boxShadow:
    x === selectedColor
      ? "0px 0px 6px 1px rgba(0,0,0,1)"
      : "0px 0px 2px 1px rgba(0,0,0,1)"
});

export default { styles };
