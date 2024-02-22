import Image from "next/image";
import SignInLogo from "../../../public/images/svg/login-logo.svg";
import SignInBox from "./SignInBox";

const SignInSection = () => {
  return (
    <section className="w-full h-full flex flex-col items-center pt-[254px] gap-[75px]">
      <div className="text-center">
        <Image src={SignInLogo} alt="로고" />
        <p className="mt-[11px] text-[24px]">로그인</p>
      </div>
      <SignInBox />
    </section>
  );
};

export default SignInSection;
