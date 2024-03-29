import Image from "next/image";
import LandingTitleGIF from "../../../public/images/jogak-landing-title.gif";
import IntroText from "./IntroText";

const IntroSection = () => {
  return (
    <section>
      <div className="w-full h-[1117px]">
        <Image
          src={LandingTitleGIF}
          width={1200}
          priority
          alt="gif"
          className="mx-auto"
        />
      </div>
      <IntroText />
    </section>
  );
};

export default IntroSection;
