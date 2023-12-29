const Trapezoid = (props: any) => {
  const trapezoidStyles = {
    "background-color": "blue",
    color: "white",
    width: "100px",
    height: "100px",
    "clip-path": "polygon(0 0, 30% 0, 58% 100%, 0% 100%)",
  };

  return (
    <div className="trapzoid" style={trapezoidStyles}>
      {props.children}
    </div>
  );
};

export default Trapezoid;
