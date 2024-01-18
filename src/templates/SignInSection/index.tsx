import Image from "next/image";
import SignInLogo from "../../../public/images/sign/signIn-logo.png";
import SignInBox from "./SignInBox";

const SignInSection = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-[55px] mt-[-80px]">
      <div className="text-center">
        <Image src={SignInLogo} alt="로고" />
        <p className="text-[24px]">로그인</p>
      </div>
      <SignInBox />
    </section>
  );
};

export default SignInSection;
