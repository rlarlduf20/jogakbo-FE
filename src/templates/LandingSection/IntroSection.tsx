import Image from "next/image";
import LandingTitleGIF from "../../../public/images/jogak-landing-title.gif";

const IntroSection = () => {
  return (
    <section className="w-full mx-auto">
      <Image src={LandingTitleGIF} width={1200} alt="gif" />
    </section>
  );
};

export default IntroSection;
