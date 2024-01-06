interface TrapezoidPropsType {
  styles: {
    width: string;
    height: string;
    bgImg?: string;
    clipPath: string;
  };
  children?: any;
}

const Trapezoid = (props: TrapezoidPropsType) => {
  const { styles } = props;
  const trapezoidStyles = {
    backgroundColor: "white",
    width: styles.width,
    height: styles.height,
    clipPath: styles.clipPath,
  };

  return <div style={{ ...trapezoidStyles }}>{props.children}</div>;
};

export default Trapezoid;
