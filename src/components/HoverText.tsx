interface HoverTextProps {
  children: React.ReactNode;
}

const HoverText = ({ children }: HoverTextProps) => {
  return <p className="absolute text-[10px]">{children}</p>;
};

export default HoverText;
