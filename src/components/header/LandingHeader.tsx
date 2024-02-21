import SignButton from "../SignButton";

const LandingHeader = () => {
  return (
    <header className="sticky top-0 w-full flex justify-center">
      <nav className="flex h-[80px] w-inner items-center justify-end">
        <SignButton />
      </nav>
    </header>
  );
};

export default LandingHeader;
