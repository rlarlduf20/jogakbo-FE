import Image from "next/image";
import LandingTitleGIF from "../../../public/images/jogak-landing-title.gif";
import IntroText from "./IntroText";

const IntroSection = () => {
  return (
    <section className="mt-[-80px]">
      <Image src={LandingTitleGIF} width={1200} alt="gif" />
      <IntroText />
    </section>
  );
};

export default IntroSection;