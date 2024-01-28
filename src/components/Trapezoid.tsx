interface TrapezoidPropsType {
  styles: {
    width: string;
    height: string;
    clipPath: string;
    bgColor?: string;
    position?: any;
    zIndex?: number;
  };
  isHover?: boolean;
  children?: any;
}

const Trapezoid = (props: TrapezoidPropsType) => {
  const { styles, isHover } = props;
  const trapezoidStyles = {
    backgroundColor: styles.bgColor,
    width: styles.width,
    height: styles.height,
    clipPath: styles.clipPath,
    position: styles.position,
    zIndex: styles.zIndex,
  };

  return (
    <>
      {isHover ? (
        <div
          style={{
            ...trapezoidStyles,
            backgroundColor: "#b9b9b9",
            transition: "0.3s",
          }}
        >
          {props.children}
        </div>
      ) : (
        <div style={{ ...trapezoidStyles, transition: "0.2s" }}>
          {props.children}
        </div>
      )}
    </>
  );
};

export default Trapezoid;
