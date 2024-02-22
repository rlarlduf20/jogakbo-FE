interface HoverTextProps {
  children: React.ReactNode;
}

const HoverText = ({ children }: HoverTextProps) => {
  return (
    <p className="absolute top-[33px] left-[50%] translate-x-[-50%] text-[12px] cursor-pointer">
      {children}
    </p>
  );
};

export default HoverText;
