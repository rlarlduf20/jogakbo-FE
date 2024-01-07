interface TrapezoidPropsType {
  styles: {
    width: string;
    height: string;
    clipPath: string;
    bgColor?: string;
    position?: any;
    zIndex?: number;
  };
  children?: any;
}

const Trapezoid = (props: TrapezoidPropsType) => {
  const { styles } = props;
  const trapezoidStyles = {
    backgroundColor: styles.bgColor,
    width: styles.width,
    height: styles.height,
    clipPath: styles.clipPath,
    position: styles.position,
    zIndex: styles.zIndex,
  };

  return <div style={{ ...trapezoidStyles }}>{props.children}</div>;
};

export default Trapezoid;
