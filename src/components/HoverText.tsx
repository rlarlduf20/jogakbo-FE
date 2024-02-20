interface HoverTextProps {
  children: React.ReactNode;
}

const HoverText = ({ children }: HoverTextProps) => {
  return (
    <p className="absolute top-[26px] left-[50%] translate-x-[-50%] text-[10px] cursor-pointer">
      {children}
    </p>
  );
};

export default HoverText;
