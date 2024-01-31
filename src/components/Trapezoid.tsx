interface TrapezoidPropsType {
  styles: {
    width: string;
    height: string;
    clipPath: string;
    bgColor?: string;
    position?: any;
    zIndex?: number;
  };
  children?: React.ReactNode;
}
interface TrapeButtonPropsType {
  children: React.ReactNode;
  handleClick?: any;
  styles?: string;
  disabled?: boolean;
}

export const Trapezoid = (props: TrapezoidPropsType) => {
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

export const TrapeButton = ({
  children,
  handleClick,
  styles,
  disabled,
}: TrapeButtonPropsType) => {
  return (
    <div
      onClick={handleClick}
      className={`bg-white w-[78px] h-[32px] [clipPath:polygon(0%_0%,100%_25%,100%_100%,0%_100%)]
        cursor-pointer ${styles} ${disabled && "pointer-events-none"}`}
    >
      <p className="text-main_black text-center pt-[5.5px]">{children}</p>
    </div>
  );
};
