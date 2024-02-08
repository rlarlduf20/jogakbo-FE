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
  type?: string;
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
  type,
}: TrapeButtonPropsType) => {
  return (
    <div
      className={`${styles} ${
        type === "outline" &&
        "bg-white w-[78px] h-[32px] flex items-center justify-center [clipPath:polygon(0%_0%,100%_25%,100%_100%,0%_100%)]"
      }`}
    >
      <div
        onClick={handleClick}
        className={`${type === "outline" ? "bg-main_black" : "bg-white"} ${
          type === "outline" ? "w-[76px] h-[30px]" : "w-[78px] h-[32px]"
        } [clipPath:polygon(0%_0%,100%_25%,100%_100%,0%_100%)]
        cursor-pointer ${disabled && "pointer-events-none"} ${styles}`}
      >
        <p
          className={`${
            type === "outline" ? "text-white" : "text-main_black"
          } text-center pt-[5.5px]`}
        >
          {children}
        </p>
      </div>
    </div>
  );
};
