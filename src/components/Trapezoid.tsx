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

export const TrapeButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto bg-white w-[78px] h-[32px] [clipPath:polygon(0%_0%,100%_25%,100%_100%,0%_100%)]">
      <p className="text-main_black text-center pt-[5.5px]">{children}</p>
    </div>
  );
};
